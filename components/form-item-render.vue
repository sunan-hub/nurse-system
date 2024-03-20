<template>
	<view class="form-item">
		<view class="label">{{ item.label }}</view>
		<view class="value-wrap">
			<!-- 单选框 -->
			<radio-group v-if="item.type == 'radio'" @change="onChange">
				<view class="radio-items-wrap" :class="item.options.length > 3 && 'column'">
					<template v-for="option in item.options">
						<label :key="option.value">
							<radio :value="option.value" :checked="getChecked(option.value)" />
							<text class="text">{{ option.label }}</text>
						</label>
					</template>
				</view>
			</radio-group>
			<!-- 复选框多选 -->
			<checkbox-group v-if="item.type == 'checkbox'" @change="onChange">
				<view class="checkbox-items-wrap" :class="item.options.length > 3 && 'column'">
					<template v-for="option in item.options">
						<label :key="option.value" class="radio-item-wrap">
							<checkbox :value="option.value" :checked="getChecked(option.value)" />
							<text class="text">{{ option.label }}</text>
						</label>
					</template>
				</view>
			</checkbox-group>
			<!-- 数字输入框 -->
			<input v-else-if="item.type == 'number'" type="number" :placeholder="'请输入' + item.label"
				v-model="currentValue" />
			<!-- 输入框 -->
			<input v-else-if="item.type == 'input'" :placeholder="'请输入' + item.label" v-model="currentValue" />
		</view>
	</view>
</template>

<script>
	export default {
		name: 'formItemRender',
		props: {
			item: {
				type: Object,
				require: true,
			},
			value: {
				require: false,
			},
		},
		data() {
			return {
				currentValue: this.value,
			}
		},
		watch: {
			value: {
				deep: true,
				handler(newValue, oldValue) {
					this.currentValue = newValue
				}
			},
			currentValue: {
				deep: true,
				handler(newValue, oldValue) {
					this.$emit('onChange', {
						key: this.item.key,
						value: newValue
					})
				}
			},
		},
		methods: {
			// 单选框和多选框不能双向绑定只能这个
			onChange(e) {
				this.$emit('onChange', {
					key: this.item.key,
					value: e.detail.value
				})
			},
			// Checked选项是否选中
			getChecked(value) {
				return this.item.type == 'checkbox' ? this.currentValue?.includes(value) : this.currentValue == value
			},
		}

	}
</script>

<style lang="scss">
	.form-item {
		font-size: 13px;
		font-weight: 400;
		margin-bottom: 32px;

		.label {
			font-size: 14px;
			color: #666666;
			margin-bottom: 8px;
		}

		.value-wrap {
			color: #000000;

			// 输入框
			.input-placeholder {
				color: #cccccc;
			}

			// 单选的选项封装
			.radio-items-wrap,
			.checkbox-items-wrap {
				&.column {
					// 超过三个选项换行
					display: flex;
					flex-direction: column;

					label {
						width: 100%;

						&:nth-child(n) {
							margin-bottom: 8px;
						}
					}
				}

				label {
					min-width: 30%;
					width: max-content;
					display: inline-block;

					&:nth-child(n) {
						margin-right: 16px;
					}
				}

				.text {
					font-size: 13px;
				}
			}
		}
	}
</style>