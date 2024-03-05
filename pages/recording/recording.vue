<template>
	<view class="page quenaire">
		<view class="question-box">
			<view class="question">
				<view class="question_order">{{ quantityTableType }}量表 1/3</view>
				<view class="question_content">
					<text>{{ question_content }}</text>
				</view>
			</view>

			<view class="audioShow">
				<luch-audio v-if="audioContent && startRecording == 0" :src="audioContent" :play.sync="audioPlayNew"
					@delete="audioDelete" :audioDuration="audioDuration"></luch-audio>
				<view class="recordBegin showpic" @tap="startRecord" v-if="startRecording == 0">
					<image src="../../static/record.png"></image>
					<text>录音</text>
				</view>
				<view class="timecountShow" v-if="startRecording == 1">
					{{timecount}}
				</view>
				<view class="recordingShow" v-if="startRecording == 1">
					<view class="cancelBtn" @tap="endRecord">
						<image src="../../static/cancel.png"></image><br>
						<text>取消</text>
					</view>
					<image v-if="isZant == false" src="../../static/recording.png" @tap="endRecordPic"></image>
					<image v-else src="../../static/zant.png" @tap="startRecordPic"></image>

					<view class="saveBtn" @tap="saveRecord">
						<image src="../../static/save.png"></image><br>
						<text>保存</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import luchAudio from '@/components/luch-audio/luch-audio.vue';

	export default {
		components: {
			luchAudio,
		},
		data() {
			return {
				audioPlayNew: false,
				content: '',
				checkList: [],
				audioContent: '',
				audioName: '',
				recorderManager: {},
				innerAudioContext: {},
				startRecording: 0,
				timecount: '00:00:00',
				hour: 0,
				minute: 0,
				second: 0,
				timer: '',
				isZant: false,
				audioDuration: '',
				quantityTableType: "Mini-Cog",
				question_content: "认真听并重复以下词语：\n苹果 手表 硬币",
			}
		},
		onLoad(options) {
			this.recorderManager = wx.getRecorderManager();
			this.innerAudioContext = wx.createInnerAudioContext();
			// 为了防止苹果手机静音无法播放
			uni.setInnerAudioOption && uni.setInnerAudioOption({
				obeyMuteSwitch: false
			})

			this.innerAudioContext.autoplay = true;

			console.log("uni.getRecorderManager()", uni.getRecorderManager())
			let self = this;
			console.log('有执行么', this.recorderManager)
			this.recorderManager.onStop(function(res) {
				self.audioDuration = res.duration;
				self.voicePath = res.tempFilePath;
			});
		},
		methods: {
			// 音频删除
			audioDelete(obj) {
				if (obj == true) { // 删除
					uni.showModal({
						content: '是否确认删除当前音频？',
						success: ({
							cancel,
							confirm
						}) => {
							if (confirm) {
								this.audioContent = '';
							}
						}
					})
				}
			},
			// 点击开始录音就开始计时
			startRecord() {
				this.startRecording = 1;
				console.log('开始录音');
				this.timecount = '00:00:00';
				this.hour = 0;
				this.minute = 0;
				this.second = 0;
				this.getTimeInterval();
				const options = {
					duration: 600000,
					sampleRate: 44100,
					numberOfChannels: 1,
					encodeBitRate: 192000,
					format: 'aac',
					frameSize: 50
				}
				console.log('options', options);
				// this.recorderManager.start();
				this.recorderManager.start(options);
				this.isZant = false;
			},
			// 计时器
			getTimeInterval() {
				clearInterval(this.timer);
				this.timer = setInterval(() => {
					this.second += 1;
					if (this.second >= 60) {
						this.minute += 1;
						this.second = 0;
					}
					if (this.minute >= 60 && this.second >= 60) {
						this.minute += 0;
						this.hour += 1;
					}
					this.timecount = this.showNum(this.hour) + ":" + this.showNum(this.minute) + ":" + this
						.showNum(this.second);
					console.log("this.timecount", this.timecount)
				}, 1000);
			},
			showNum(num) {
				if (num < 10) {
					return '0' + num
				}
				return num
			},
			// 取消录音
			endRecord() {
				console.log('录音结束');
				this.recorderManager.stop();
				clearInterval(this.timer);
				this.startRecording = 0;
				this.timecount = '00:00:00';
				this.hour = 0;
				this.minute = 0;
				this.second = 0;
			},
			// 中间图片点击的暂停  点击暂停时同时关闭定时任务
			endRecordPic() {
				console.log('录音暂停');
				this.recorderManager.pause();
				clearInterval(this.timer);
				this.isZant = !this.isZant;
			},
			// 中间图片点击开始 
			startRecordPic() {
				console.log('重新开始录音');
				this.recorderManager.resume();
				this.getTimeInterval();
				this.isZant = !this.isZant;
			},
			// 保存（暂停定时加上传）
			saveRecord() {
				this.recorderManager.stop();
				this.isZant = true;
				clearInterval(this.timer);
				this.audioContent == '';
				setTimeout(() => {
					this.audioAdd();
				}, 300);
			},
			playVoice() {
				console.log('播放录音');
				console.log('this.voicePath', this.voicePath);
				if (this.voicePath) {
					this.innerAudioContext.src = this.voicePath;
					this.innerAudioContext.play();
				}
			},
			// 上传录音文件
			audioAdd() {
				console.log("上传录音文件 this.voicePath", this.voicePath)
				uni.showLoading({
					title: '保存中...'
				});
				if (this.voicePath) {
					uni.uploadFile({
						url: this.baseUrl, //仅为示例，非真实的接口地址
						filePath: this.voicePath,
						name: 'file',
						success: (res) => {
							uni.hideLoading();
							JSON.parse(res.data) && uni.showToast({
								title: '保存成功！',
								icon: 'success'
							});
							this.audioContent = JSON.parse(res.data).result.visiturl;
							this.startRecording = 0;
						},
						fail: (err) => {
							console.log('audioContent', err, this.audioContent, this.startRecording, this.audioDuration);
							uni.hideLoading();
						}
					});
				} else {
					console.log("录音失败")
					uni.showToast({
						title: '录音失败！',
						icon: 'error'
					});
					uni.hideLoading();
				}
			},
		},
	}
</script>

<style lang="less" scoped>
	.page {
		background-image: linear-gradient(#76EEC6, #7FFFD4);
		box-sizing: border-box;
		padding: 16rpx;
		width: 100vw;
		height: 100vw;
	}

	.question_order {
		font-weight: bold;
		margin-top: 14rpx;
		margin-bottom: 30rpx;
	}

	.question_content {
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

	.recordBegin.showpic {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		// border:1px solid black;
		margin-top: 200rpx;



	}

	.quenaire {
		padding: 0 30rpx;

		.question-box {
			background-color: #FFFFFF;
			border: 6rpx solid #7FFFD4;
			border-radius: 16rpx;
			margin-top: 40rpx;
			position: relative;
			z-index: 2;
			padding: 30rpx;
			width: 620rpx;
			height: 100vw;
		}

		.audioShow {
			.recordBegin {
				image {
					width: 140rpx;
					height: 140rpx;
				}

				text {
					color: #FFFFFF;
					margin-left: -100rpx;
					position: relative;
					top: -55rpx;
				}
			}

			.recordingShow {
				display: flex;
				justify-content: space-around;
				font-size: 22rpx;
				color: #76EEC6;

				image {

					&:nth-child(1),
					&:nth-child(3) {
						width: 56rpx;
						height: 56rpx;
					}

					&:nth-child(2) {
						width: 140rpx;
						height: 140rpx;
					}
				}

				.cancelBtn,
				.saveBtn {
					margin-top: 40rpx;
					width: 56rpx;
					text-align: center;
				}

				.cancelBtn {
					margin-left: 40rpx;
				}

				.saveBtn {
					margin-right: 40rpx;
				}
			}

			.timecountShow {
				color: #B2B2B2;
				font-size: 50rpx;
				text-align: center;
				margin: 60rpx 0;
			}
		}

		.audioPlay {
			margin-top: 40rpx;

			button {
				font-size: 34rpx;
				width: 40%;
				height: 80rpx;
				line-height: 80rpx;
				margin-bottom: 30rpx;
			}
		}
	}
</style>