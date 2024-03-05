<template>
	<view class="pages">
		<view class="navbar" :style="{ paddingTop: safeAreaInsets ? safeAreaInsets.top + 5 +'px' : '0' }">
			<text class="navtext">{{quantityTable}}</text>
		</view>
		<button @click="newEvaluation">新建测评</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				safeAreaInsets: null,
				quantityTable: "首页",
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
			newEvaluation() {
				uni.navigateTo({
				    url:'/pages/recording/recording'
				});
			}
		}
	}
</script>

<style>
	/* 自定义导航条 */
	.navbar {
		background-image: url(@/static/navigator_bg.png);
		background-size: cover;
		position: relative;
		display: flex;
		flex-direction: column;
		padding-top: 32px;
		padding-bottom: 28rpx;
		justify-content: center;
		align-items: center;
	}

	.navtext {
		color: white;
	}
</style>