<template <view class="navbar">
	<view>
		<view class="goback">
			返回
		</view>
		<text class="navtext">挺好</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		methods: {
			goback() {
				uni.navigateBack({
					delta: 1, //返回层数，2则上上页
				})
			}
		}
	}
</script>

<style lang="less">
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

		.navtext {
			color: white;
		}
	}
</style>