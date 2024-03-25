<template>
	<view class="page-wrap">
		<navbar pageTitle="缺血指数量表(HIS)" :showGoback="true" />

		<view class="evaluate-form-wrap">
			<scroll-view scroll-y scroll-with-animation class="content-wrap" :scroll-into-view="scrollId"
				@scroll="scroll">
				<view class="title">基本信息
				</view>
				<view class="item">
					<template v-for="item in items">
						<form-item-render :id="'scroll-' + item.key" :key="item.key" :item="item"
							v-model="formData[item.key]" :disable="isDetail" :showText="true"
							v-if="!item.showCondition || getShowFormItem(item.showCondition)"
							@onChange="itemOnChange" />
					</template>
				</view>
			</scroll-view>

			<!-- 按钮区域 -->
			<view class="foot" v-if="!isDetail">
				<button class="default" @click="formReset">重置</button>
				<button @click="formSubmit">提交</button>
			</view>

			<view class="foot" v-else>
				<button class="btn" @click="gotoDetail('/pages/test-page-nav/mini-cog/mini-cog')">上一页</button>
				<button class="btn" @click="gotoDetail('/pages/test-page-nav/mmse/mmse')">下一页</button>
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/nav-bar.vue';
	import formItemRender from '@/components/form-item-render.vue'
	import store from '@/store/index.js'
	import {
		mapActions
	} from 'vuex'

	export default {
		name: 'his',
		components: {
			navbar,
			formItemRender,
		},
		data() {
			return {
				scrollId: '', // 要滚动至显示的元素
				items: store.state.hisItems,
				formData: { // 结构赋值，不然会直接更改仓库
					...(JSON.parse(
						'{"acute_onset":"1","step_deterioration":"0","fluctuating_course":"1","unconcisous":"0","integrate_personalities":"1","depression":"0","body_state":"1","affective_incontinence":"0","hypertension":"1","stroke":"0","arteriosclerotic":"1","neurological_symptoms":"0","neurological_signs":"1","patient_id":"1","patient_name":"1","nurse":"1","created_at":"zza","score_sum":"1"}'
					) || store.state.hisData || {})
				},
				isDetail: false,
				patient_id: 1,
				patient_name: 1,
			}
		},
		computed: {
			inputDisabled() {
				return this.radioValue === '是';
			},
		},
		onLoad: function(option) { // option为object类型，会序列化上个页面传递的参数
			this.isDetail = !!Number(option.isDetail);
		},
		methods: {
			formSubmit() {
				let nullItem = null; // 存在未填写且显示的元素
				store.state.hisItems.forEach((item) => {
					if (nullItem) return; // 存在就别在找了
					let isNull = false; // 是否未填写
					switch (item.type) {
						case 'input':
						case 'number':
						case 'radio':
							if (this.formData[item.key] == undefined || this.formData[item.key] == '')
								isNull = true
							break;
						case 'checkbox':
							if (!this.formData[item.key]?.length) isNull = true
							break;
					}
					if (isNull) {
						// 是否是被隐藏的元素
						const showToast = !item.showCondition || this.getShowFormItem(item.showCondition)
						if (showToast) nullItem = item;
					}
				})

				if (nullItem) {
					console.log('scroll-' + nullItem.key)
					this.scrollId = 'scroll-' + nullItem.key;
					uni.showToast({
						title: '请填写' + nullItem.label,
						icon: 'none'
					})
				} else {
					this.formData["patient_id"] = "1";
					this.formData["patient_name"] = "1";
					this.formData["nurse"] = "1";
					this.formData["created_at"] = "zza";
					this.formData["score_sum"] = "1";

					// const result = JSON.stringify(this.formData);
					//const result = this.formData;

					// const result = store.state.hisData;
					// // result.patient_id = "1";
					// 注入仓库
					store.commit('setHisData', {
						...this.formData
					})
					console.log('33333333333', JSON.stringify(store.state.hisData));

					//网络请求
					// uni.request({
					//     url: 'http://47.113.91.80:8002/quest/uploadQuest3', //仅为示例，并非真实接口地址。
					// 	method:'POST',
					//     data: {
					//         result,
					//     },
					//     header: {
					//         //'custom-header': 'hello' //自定义请求头信息
					//     },
					//     success: (res) => {
					//         console.log(res.data);
					//         this.text = 'request success';
					//     }
					// });

					// uni.showModal({
					// 	content: '表单数据内容：' + JSON.stringify(this.formData),
					// 	showCancel: false
					// });
				}
			},
			formReset() {
				Object.keys(this.formData).forEach(key => {
					this.$set(this.formData, key, undefined)
				})
				// 清空仓库数据
				store.commit('setHisData', {})
			},
			// 监听item变化
			itemOnChange(item) {
				this.$set(this.formData, item.key, item.value)
			},
			// 判断是否显示绑定条件字段
			getShowFormItem(condition) {
				return this.formData[condition.key] == condition.value
			},
			// 容器滚动时
			scroll() {
				this.scrollId = ''
			},
			// 跳转上下详情页
			gotoDetail(url) {
				uni.navigateTo({
					url: url + '?isDetail=1'
				});
			}
		}
	}
</script>

<style lang="scss">
	.page-wrap {
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		overflow: hidden;

		.evaluate-form-wrap {
			box-sizing: border-box;
			flex: 1;
			display: flex;
			flex-direction: column;
			overflow: hidden;

			// 内容区域
			.content-wrap {
				flex: 1;
				padding: 8px 12px;
				overflow: auto;

				// 大标题
				.title {
					font-size: 16px;
					font-weight: 600;
					margin-bottom: 12px;
				}

			}

			// 按钮区域
			.foot {
				border-top: 1px solid #dddddd;
				padding: 8px 12px;
				display: flex;
				justify-content: space-between;
				padding: 8px 0;
				background-color: #ffffff;

				button {
					width: 46%;
					height: 40px;
					background-color: #5cd7aa;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #ffffff;

					&.default {
						background-color: #ffffff;
						color: #000000;
					}
				}
			}
		}
	}
</style>