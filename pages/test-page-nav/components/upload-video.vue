<template>
	<view class='page-wrap'>
		<view class="content">
			<!-- 题目 -->
			<view class="question_content">
				<text>{{ question_content }}</text>
			</view>

			<!-- 视频 -->
			<view class="images_box">
				<view class='video-box' v-if="!!videoPath">
					<video class='video' :src='videoPath' :poster='videoPath' />
					<view class='delete' @click='imgDelete'>
						删除重新录制
					</view>
				</view>
				<view class='video-box' @click='addPic' v-else>
					<image class='video' src='../../../static/add_image.png'></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			defaultValue: {
				type: String,
				required: false
			},
		},
		data() {
			return {
				videoPath: this.defaultValue || '',
				quantityTableType: "Mini-Cog",
				question_content: "画出钟表表盘：\n徒手画出11:10或8:20",
				safeAreaInsets: null,
				quantityTable: "HIS量表",
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
			//*选择视频*//
			addPic: async function() {
				let that = this
				// 选择视频
				uni.chooseVideo({
					sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
					success(res) {
						that.videoPath = res.tempFilePath
						that.$emit('onChange', that.videoPath)
					},
					fail(err) {
						console.log('err', err)
					}
				})
			},
			//*显示选择后的图片*//
			imgbox: function(e) {
				this.videoPath = e.detail.value
			},
			//* 删除已经选择的图片 *//
			imgDelete: function(e) {
				this.videoPath = '';
				this.addPic()
			},
		},
	}
</script>

<style lang="less">
	.page-wrap {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding: 16rpx;
		overflow-y: auto;

		.content {
			box-sizing: border-box;
			width: 100%;
			height: 80%;
			background-color: #FFFFFF;
			border-radius: 16rpx;
			padding: 30rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
			overflow-x: hidden;

			.question_content {
				width: 100%;
				font-weight: bold;
				font-size: 45rpx;
				text-align: center;
				justify-content: center;
				align-items: center;
				display: flex;
				box-sizing: border-box;
				padding: 8rpx;
				width: 100%;
				height: 300rpx;
				background-color: #e7eaec;
				border-radius: 8px;
			}

			// 图片区域
			.images_box {
				width: 90vw;
				height: 90vw;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: space-evenly;

				.video-box {
					width: calc(100% - 68px);
					height: calc(100% - 68px);
					margin: 24px 0;
					display: flex;
					flex-direction: column;

					.video {
						width: 100%;
						height: calc(100% - 40px);
					}

					.delete {
						font-size: 16px;
						width: 100%;
						height: 32px;
						margin-top: 8px;
						border-radius: 4px;
						color: #ffffff;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}

			// 按钮
			button {
				border: none;
				color: #ffffff;
				margin: 0;
				// margin-top: 20rpx;
				width: calc(100vw - 32px);
				background-color: #76EEC6;
				border-radius: 8px;

			}
		}
	}
</style>