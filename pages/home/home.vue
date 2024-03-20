<template>
	<view class="page-wrap">
		<navbar :pageTitle="pageTitle" />

		<!-- 搜索 -->
		<view class="search-wrap">
			<view class="input-wrap">
				<input class="search-input" v-model="searchValue" />
				<view class="placeholder">
					<image class="search-icon" src="../../static/search.png" />
					搜索
				</view>
			</view>
			<text v-if="searchValue" class="close" @click="closeSearch">取消</text>
		</view>

		<!-- 内容区域 -->
		<uni-list class="content">
			<uni-list-item title="自定义右侧插槽" note="列表描述信息" link>
				<template slot="header">
					<image style="width: 30px;height: 30px;" src="/static/logo.png" mode="widthFix" />
				</template>
			</uni-list-item>

			<uni-list-item>
				<view slot="header">
					<image style="width: 30px;height: 30px;" src="/static/logo.png" mode="widthFix" />
				</view>

				<text slot="body" class="slot-text">自定义左侧插槽</text>
				<template slot="footer">
					<image style="width: 30px;height: 30px;" src="/static/logo.png" mode="widthFix" />
				</template>
			</uni-list-item>
		</uni-list>

		<!-- 按钮区域 -->
		<view class="btn-list">
			<button @click="goQuantityTable">新建测评</button>
			<button open-type="contact">联系客服</button>
			<button open-type="contact" id="btnId" style="display: none" bindtap="clickToShare"></button>
			<button open-type='feedback'>意见反馈</button>
		</view>
	</view>

</template>

<script>
	import navbar from '@/components/nav-bar.vue';

	export default {
		components: {
			navbar
		},
		data() {
			return {
				safeAreaInsets: null,
				pageTitle: "首页",
				searchValue: '',
			}
		},
		mounted() {
			this.getSafeAreaInsets()
		},
		methods: {
			getSafeAreaInsets() {
				// 获取屏幕边界到安全区域距离
				const systemInfo = uni.getSystemInfoSync()
				this.safeAreaInsets = systemInfo.safeAreaInsets
			},
			onClick(e) {
				uni.showToast({
					title: '点击反馈'
				});
			},
			goQuantityTable() {
				uni.navigateTo({
					url: '/pages/test-page-nav/test-page-nav'
				});
			},
			closeSearch() {
				this.searchValue = ''
			},
		}
	}
</script>

<style lang="scss">
	.page-wrap {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;

		.search-wrap {
			display: flex;
			align-items: center;
			border-radius: 8px;
			background-color: rgb(239, 239, 245);
			padding: 6px;
			margin: 12px 12px 16px 12px;

			.input-wrap {
				position: relative;
				flex: 1;

				.search-input {
					background-color: #fff;
					border-radius: 8px;
					height: 30px;
					flex: 1;
					padding: 2px 6px;
				}

				.placeholder {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					color: #aaaaaa;
					pointer-events: none;
					display: flex;
					align-items: center;

					.search-icon {
						height: 20px;
						width: 20px;
					}
				}
			}


			.close {
				padding: 0px 16px;
				color: rgb(144, 215, 172);
				font-size: 16px;
				white-space: nowrap;
			}
		}

		// 内容区域
		.content {
			flex: 1;
			overflow: auto;
		}

		.btn-list {
			width: 100%;
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			padding: 8px 12px;

			button {
				margin-bottom: 12px;
				width: 100%;
				background-color: #6ed787;
				border: none;
				color: #ffffff;
			}
		}
	}

	.slot-text {
		flex: 1;
		font-size: 14px;
		color: #4cd964;
		margin-right: 10px;
	}
</style>