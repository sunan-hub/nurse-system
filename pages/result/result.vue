<template>
	<view class="page-wrap">
		<navbar pageTitle="结果" :showGoback="false" />

		<uni-list class="content-wrap">
			<uni-list-item title="测评结果（按时间顺序）" />

			<!-- 真正的列表区域 -->
			<view class="result-list">
				<uni-list-item v-for="item in itemList" :key="item.title" :title="item.title" :note="item.note"
					:rightText="item.rightText" :thumb="item.thumb" :thumb-size="item.thumbSize" showArrow clickable
					@click="onClick(item)" />
			</view>
		</uni-list>
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
				itemList: new Array(20).fill(0).map((item, index) => ({
					title: '老人' + (index + 1),
					note: '列表描述信息',
					rightText: '查看历史测量记录',
					thumb: '/static/old.png',
					thumbSize: 'lg'
				}))
			}
		},
		methods: {
			onClick(item) {
				uni.navigateTo({
					url: `/pages/result/test-history?userId=${item.title}1`
				});
			}
		}
	}
</script>

<style lang="scss">
	.page-wrap {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;

		.content-wrap {
			flex: 1;
			overflow: hidden;
			display: flex;
			flex-direction: column;

			.result-list {
				flex: 1;
				overflow: auto;
			}
		}
	}
</style>