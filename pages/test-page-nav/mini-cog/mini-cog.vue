<template>
	<view class="mini-cog-wrap" :class="isDetail && 'detail-page'">
		<navbar v-if="!isDetail" :pageTitle="'MINI-COG量表 ' + current + '/3'" :showGoback="true" />

		<view class="content">
			<!-- 第一题录音 -->
			<recordingOne v-if="current == 1 || isDetail" @onChange="handleSaveRecording" :value="recordingVoicePath1"
				:isDetail="isDetail" />
			<!-- 第二题画图 -->
			<uploadVideo v-if="current == 2 || isDetail" @onChange="handleSaveVideo" :value="videoPath"
				:isDetail="isDetail" />
			<!-- 第三题 -->
			<recordingThree v-if="current == 3 || isDetail" @onChange="handleSaveRecording" :value="recordingVoicePath2"
				:isDetail="isDetail" />
		</view>

		<!-- 按钮区域 -->
		<view class="foot" v-if="!isDetail">
			<button class="btn" @click="switchPage('down')" v-if="current != 1">上一题</button>
			<button class="btn" @click="switchPage('cancel')" v-else>取消测试</button>
			<button class="btn" @click="switchPage('up')" v-if="current != 3">下一题</button>
			<button class="btn" @click="switchPage('submit')" v-else>提交</button </view>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/nav-bar.vue';
	import recordingOne from './one.vue';
	import uploadVideo from './two.vue';
	import recordingThree from './three.vue';
	import store from '@/store/index.js'

	export default {
		components: {
			navbar,
			uploadVideo,
			recordingOne,
			recordingThree
		},
		data() {
			return {
				current: 1,
				recordingVoicePath1: '',
				recordingVoicePath2: '',
				videoPath: '',
				isDetail: false
			}
		},
		mounted() {
			this.getData();
		},
		methods: {
			// 切换页面
			switchPage(type) {
				if (type == 'up') this.current += 1;
				else if (type == 'down') this.current -= 1;
				else if (type == 'submit') {
					// 注入仓库
					store.commit('setMiniCogData', {
						recordingVoicePath1: this.recordingVoicePath1,
						videoPath: this.videoPath,
						recordingVoicePath2: this.recordingVoicePath2
					})
				} else uni.navigateBack().catch(() => {
					uni.switchTab({
						url: '/pages/home/home'
					})
				});
			},
			// 上传视频发生变化
			handleSaveVideo(data) {
				this.videoPath = data;
			},
			// 录音文件发生变化
			handleSaveRecording(data) {
				if (this.current == 3)
					this.recordingVoicePath2 = data;
				else this.recordingVoicePath1 = data;
			},
			// 赋值初始值
			getData() {
				this.recordingVoicePath1 = store.state.miniCogData?.recordingVoicePath1 || '';
				this.recordingVoicePath2 = store.state.miniCogData?.recordingVoicePath2 || '';
				this.videoPath = store.state.miniCogData?.videoPath || '';
			}
		}
	}
</script>

<style lang="scss">
	.mini-cog-wrap {
		width: 100vw;
		height: 100vh;
		display: flex;
		overflow: hidden;
		flex-direction: column;
		background-image: linear-gradient(#76EEC6, #7FFFD4);

		&.detail-page {
			height: 100%;
			width: 100%;
		}

		.content {
			width: 100%;
			flex: 1;
			overflow: auto;
		}

		// 按钮区域
		.foot {
			display: flex;
			justify-content: space-between;
			padding: 8px 12px;
			background-color: #ffffff;

			.btn {
				width: 46%;
				height: 40px;
				background-color: #5cd7aa;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #ffffff;
			}
		}
	}
</style>