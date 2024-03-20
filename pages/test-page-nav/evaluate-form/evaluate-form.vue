<template>
	<view class="page-wrap" :class="isDetail && 'detail-page'">
		<navbar v-if="!isDetail" pageTitle="阿尔兹海默病早期筛查及评估" :showGoback="true" />

		<view class="evaluate-form-wrap">
			<view class="content-wrap">
				<view class="title">基本信息</view>
				<view class="item">
					<template v-for="item in items">
						<form-item-render :key="item.key" :item="item" v-model="formData[item.key]"
							v-if="!item.showCondition || getShowFormItem(item.showCondition)"
							@onChange="itemOnChange" />
					</template>
				</view>
			</view>

			<!-- 按钮区域 -->
			<view class="foot" v-if="!isDetail">
				<button class="default" @click="formReset">重置</button>
				<button @click="formSubmit">提交</button>
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
		props: {
			isDetail: {
				type: Boolean,
			}
		},
		data() {
			return {
				items: store.state.evaluateFormItems,
				formData: { // 结构赋值，不然会直接更改仓库
					...(store.state.evaluateFormData || {})
				},
			}
		},
		computed: {
			inputDisabled() {
				return this.radioValue === '是';
			},
		},
		methods: {
			formSubmit() {
				
				this.formData["patient_id"] = "1";
				// this.formData["patient_name"] = "1";
				this.formData["nurse"] = "1";
				this.formData["created_at"] = "zza";
				this.formData["score_sum"] = "1";
				
				
				// 注入仓库
				store.commit('setEvaluateFormData', {
					...this.formData
				})
				
				console.log('111111111111111',store.state.evaluateFormData);
				
				
				uni.showModal({
					content: '表单数据内容：' + JSON.stringify(this.formData),
					showCancel: false
				});
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

		&.detail-page {
			height: 100%;
			width: 100%;
		}

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