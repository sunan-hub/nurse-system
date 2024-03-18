<template>
	<view class="evaluate-form-wrap">
		<form @submit="formSubmit" @reset="formReset">
			<view class="title">基本信息</view>
			<template v-for="item in items">
				<form-item-render :key="item.key" :item="item" :formData="JSON.stringify(formData)"
					@onChange="itemOnChange" />
			</template>
		</form>
	</view>
</template>

<script>
	import navbar from '@/components/nav-bar.vue';
	import formItemRender from '@/components/form-item-render.vue'

	export default {
		name: 'evaluateForm',
		components: {
			formItemRender,
		},
		props: {
			defaultValue: {
				type: Object,
				required: false
			},
		},
		data() {
			return {
				safeAreaInsets: null,
				quantityTable: "阿尔兹海默病早期筛查及评估",
				items: [{
						label: '名字',
						key: 'name',
						type: 'input'
					},
					{
						label: '性别',
						key: 'sex',
						type: 'radio',
						options: [{
							label: '男',
							value: '1',
						}, {
							label: '女',
							value: '0',
						}]
					},
					{
						label: '年龄',
						key: 'age',
						type: 'number'
					},
					{
						label: '身高',
						key: 'height',
						type: 'number'
					},
					{
						label: '体重',
						key: 'weight',
						type: 'number'
					},
					{
						label: '出生地',
						key: 'birthplace',
						type: 'input'
					},
					{
						label: '长期居住地',
						key: 'city',
						type: 'radio',
						options: [{
							label: '城市',
							value: 'city',
						}, {
							label: '农村',
							value: 'village',
						}]
					},
					{
						label: '职业',
						key: 'career',
						type: 'checkbox',
						options: [{
							label: '家公务员',
							value: '1',
						}, {
							label: '专业技术人员',
							value: '2',
						}, {
							label: '农、林、牧、渔业人员',
							value: '3',
						}, {
							label: '社会生产和生活服务人员',
							value: '4',
						}, {
							label: '其他不便分类的从业人员',
							value: '5',
						}]
					},
					{
						label: '毒药物接触史',
						key: 'drug',
						type: 'radio',
						options: [{
							label: '是',
							value: '1',
						}, {
							label: '否',
							value: '0',
						}],
						detail: {
							label: '具体毒药物接触史',
							key: 'specificDrug',
							showValue: '1' // 毒药物接触史等于1的时候显示
						}
					},
				],
				formData: this.defaultValue || {
					name: "子安",
					sex: 0,
					age: 21,
					height: 155,
					weight: 54,
					city: "city",
					career: "checkbox2",
					drug: 0,
				},
			}
		},
		watch: {
			formData: {
				handler: 'handleFormDataChange',
				deep: true
			}
		},
		mounted() {
			this.getSafeAreaInsets()
		},
		computed: {
			inputDisabled() {
				return this.radioValue === '是';
			},
		},
		methods: {
			getSafeAreaInsets() {
				// 获取屏幕边界到安全区域距离
				const systemInfo = uni.getSystemInfoSync()
				this.safeAreaInsets = systemInfo.safeAreaInsets
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				uni.showModal({
					content: '表单数据内容：' + JSON.stringify(formdata),
					showCancel: false
				});
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			// 修改性别
			sexChange(e) {
				this.$set(this.formData, 'sex', e.detail.value)
			},
			// 监听表单值变化
			handleFormDataChange(value) {
				this.$emit('handleFormDataChange', value);
			},
			// 监听item变化
			itemOnChange(item) {
				this.$set(this.formData, item.key, item.value)
			},
		}
	}
</script>

<style lang="scss">
	.evaluate-form-wrap {
		padding: 8px 12px;

		.title {
			font-size: 16px;
			font-weight: 600;
			margin-bottom: 12px;
		}
	}

	.uni-form-item .title {
		padding: 20rpx 0;
	}
</style>