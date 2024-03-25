<template>
	<view class="page-wrap">
		<navbar pageTitle="阿尔兹海默病早期筛查及评估" :showGoback="true" />

		<view class="evaluate-form-wrap">
			<scroll-view scroll-y scroll-with-animation class="content-wrap" :scroll-into-view="scrollId"
				@scroll="scroll">
				<view class="title">基本信息</view>
				<view class="item">
					<template v-for="item in items">
						<form-item-render :id="'scroll-' + item.key" :key="item.key" :item="item"
							v-model="formData[item.key]" :disable="isDetail"
							v-if="!item.showCondition || getShowFormItem(item.showCondition)"
							@onChange="itemOnChange" />
					</template>
				</view>

				<view class="score" v-if="isDetail || true">
					总得分：{{ score }}
				</view>
			</scroll-view>

			<!-- 按钮区域 -->
			<view class="foot" v-if="!isDetail">
				<button class="default" @click="formReset">重置</button>
				<button @click="formSubmit">提交</button>
			</view>

			<view class="foot" v-else>
				<button @click="gotoMiniCogDetail">下一页</button>
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/nav-bar.vue';
	import formItemRender from '@/components/form-item-render.vue'
	import store from '@/store/index.js'

	export default {
		name: 'evaluateForm',
		components: {
			navbar,
			formItemRender,
		},
		data() {
			return {
				scrollId: '', // 要滚动至显示的元素
				score: 0, // 总得分
				isDetail: false, // 是否是详情页，是就不能编辑
				items: store.state.evaluateFormItems, // 渲染表单的配置
				formData: {
					...(JSON.parse(
						'{"pationt_name":"孙安","sex":"1","age":"25","bmi":"100","birthplace":"海南昌江","address":"广州","city":"city","career":"1","drug":"0","drug_history":"虚无","smoke":"0","hobby":"3","hobby_puzzle":"很多","patient_id":"1","nurse":"1","created_at":"zza","score_sum":"1","hobby_music":"音乐","hobby_Instrument":"乐器","hobby_others":"其他","habit_dietary":"1","habit_brushteeth":"1"," habit_stayup":"0","habit_sleep":"2","personality":"0","finance":"1","hypertension":"0","cad":"1","cad_medicine":"1","diabetes":"1","diabetes_control":"0","diabetes_medicine":"2","hereditary":"0","hereditary_others":"虚"}'
					) || store.state.evaluateFormData || {})
				},
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
				store.state.evaluateFormItems.forEach((item) => {
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
					// this.formData["patient_name"] = "1";
					this.formData["nurse"] = "1";
					this.formData["created_at"] = "zza";
					this.formData["score_sum"] = "1";

					// 注入仓库
					store.commit('setEvaluateFormData', {
						...this.formData
					})
					
					console.log('JSON.stringify(this.formData)', JSON.stringify(this.formData))

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
				store.commit('setEvaluateFormData', {})
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
			// 跳转到第二张表详情
			gotoMiniCogDetail() {
				uni.navigateTo({
					url: '/pages/test-page-nav/mini-cog/mini-cog?isDetail=1'
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

				// 总得分
				.score {
					width: 100%;
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