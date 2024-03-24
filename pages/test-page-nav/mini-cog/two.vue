<template>
	<view class='page-wrap'>
		<view class="content">
			<!-- 题目 -->
			<view class="tips">
				<text>{{ tips }}</text>
			</view>

			<!-- 视频 -->
			<upload-video :value="videoPath" @onChange="onChange" :disable="isDetail" />

			<!-- 删除按钮 -->
			<view v-if="!!videoPath && !isDetail" class='deleteBtn' @click='handleDelete'>
				删除重新拍摄
			</view>

			<view class="result" v-if="videoPath || true">
				<view class="label"> 结果
					答对个数：
				</view>
				<checkbox-group class="value-wrap" @change="resultChange">
					<label class="item-wrpa">
						<checkbox value="0" :disabled="isDetail" />画不出
					</label>
					<label class="item-wrpa">
						<checkbox value="1" :disabled="isDetail" />画出闭锁的圆
					</label>
					<label class="item-wrpa">
						<checkbox value="2" :disabled="isDetail" />将数字安置在正确的位置
					</label>
					<label class="item-wrpa">
						<checkbox value="3" :disabled="isDetail" />包括全部12个正确的数字
					</label>
					<label class="item-wrpa">
						<checkbox value="4" :disabled="isDetail" />将指针安置在正确的位置
					</label>
				</checkbox-group>
			</view>

			<view class="score" v-if="isDetail || true">
				总得分：{{ score }}
			</view>
		</view>
	</view>
</template>

<script>
	import uploadVideo from '@/components/upload-video.vue';

	export default {
		components: {
			uploadVideo
		},
		props: {
			value: {
				type: String,
				required: false
			},
			isDetail: {
				type: Boolean,
				require: false
			}
		},
		watch: {
			value: {
				deep: true,
				handler(newValue, oldValue) {
					this.videoPath = newValue
				}
			},
		},
		data() {
			return {
				score: 0, // 分数
				videoPath: this.value, // 图片地址
				quantityTableType: "Mini-Cog",
				tips: "画出钟表表盘：\n徒手画出11:10或8:20",
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
			onChange(data) {
				this.$emit('onChange', data)
			},
			//* 删除已经选择的图片 *//
			handleDelete() {
				this.$emit('onChange', '')
			},
			// 结果变化
			resultChange(e) {
				this.score = e.detail.value.filter(value => value != "0").length;
			}
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
			height: 90%;
			background-color: #FFFFFF;
			border-radius: 16rpx;
			padding: 30rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
			overflow-x: hidden;

			.tips {
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

			.deleteBtn {
				font-size: 16px;
				width: calc(100% - 68px);
				height: 32px;
				padding: 4px 0;
				border-radius: 4px;
				color: #ffffff;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: rgba(255, 0, 0, 0.5);
			}

			.result {
				margin-top: 8px;
				width: 100%;

				.label {
					color: #999;
				}

				.value-wrap {
					display: flex;
					flex-direction: column;

					.item-wrpa {
						display: flex;
						align-items: center;
						margin-top: 8px;
					}
				}
			}

			.score {
				margin-top: 24px;
				width: 100%;
			}
		}
	}
</style>