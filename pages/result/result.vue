<template>
	<view class="page-wrap">
		<navbar pageTitle="结果" :showGoback="true" />

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
				itemList: [{
						title: '老人1',
						note: '列表描述信息',
						rightText: '查看结果',
						thumb: '/static/old.png',
						thumbSize: 'lg'
					},
					{
						title: '老人2',
						note: '列表描述信息',
						rightText: '查看结果',
						thumb: '/static/old.png',
						thumbSize: 'lg'
					},
					{
						title: '老人3',
						note: '列表描述信息',
						rightText: '查看结果',
						thumb: '/static/old.png',
						thumbSize: 'lg'
					},
					{
						title: '老人4',
						note: '列表描述信息',
						rightText: '查看结果',
						thumb: '/static/old.png',
						thumbSize: 'lg'
					},
					{
						title: '老人5',
						note: '列表描述信息',
						rightText: '查看结果',
						thumb: '/static/old.png',
						thumbSize: 'lg'
					},
					{
						title: '老人6',
						note: '列表描述信息',
						rightText: '查看结果',
						thumb: '/static/old.png',
						thumbSize: 'lg'
					},
					{
						title: '老人7',
						note: '列表描述信息',
						rightText: '查看结果',
						thumb: '/static/old.png',
						thumbSize: 'lg'
					},
					{
						title: '老人8',
						note: '列表描述信息',
						rightText: '查看结果',
						thumb: '/static/old.png',
						thumbSize: 'lg'
					},
					{
						title: '老人9',
						note: '列表描述信息',
						rightText: '查看结果',
						thumb: '/static/old.png',
						thumbSize: 'lg'
					},
					{
						title: '老人10',
						note: '列表描述信息',
						rightText: '查看结果',
						thumb: '/static/old.png',
						thumbSize: 'lg'
					},
					{
						title: '老人11',
						note: '列表描述信息',
						rightText: '查看结果',
						thumb: '/static/old.png',
						thumbSize: 'lg'
					},
					{
						title: '老人12',
						note: '列表描述信息',
						rightText: '查看结果',
						thumb: '/static/old.png',
						thumbSize: 'lg'
					},
					{
						title: '老人13',
						note: '列表描述信息',
						rightText: '查看结果',
						thumb: '/static/old.png',
						thumbSize: 'lg'
					},
					{
						title: '老人14',
						note: '列表描述信息',
						rightText: '查看结果',
						thumb: '/static/old.png',
						thumbSize: 'lg'
					},
				]
			}
		},
		methods: {
			onClick(item) {
				uni.navigateTo({
					url: '/pages/result/detail?username=' + item.title
				})
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