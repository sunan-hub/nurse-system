<template>
	<view class="page-wrap">
		<navbar :pageTitle="userInfo.userId + '测评结果记录'" :showGoback="true" />

		<view class="content-wrap">
			<!-- 用户信息 -->
			<view class="user-info-wrap">
				<image class='avatar' :src="userInfo.avatar || require('@/static/old.png')" />
				<view class="user-name">
					{{ userInfo.userId }}
				</view>
			</view>

			<!-- 结果数据 -->
			<view class="data-list-wrap">
				<template v-for="item in dataList">
					<list-item-render :date="item.createDate" @gotoDetail="gotoDetail" />
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/nav-bar.vue';
	import listItemRender from './list-item-render.vue';

	export default {
		components: {
			navbar,
			listItemRender
		},
		data() {
			return {
				userInfo: {
					userId: '',
					userName: '',
					avatar: ''
				},
				dataList: new Array(20).fill(0).map((item, index) => ({
					createDate: Date.now() + index * 86400000
				}))
			}
		},
		onLoad(option) { // option为object类型，会序列化上个页面传递的参数
			this.$set(this.userInfo, 'userId', option.userId)
		},
		methods: {
			gotoDetail() {
				uni.navigateTo({
					url: `/pages/test-page-nav/test-page-nav?userId=${this.userInfo.userId}&isDetail=1`
				});
			}
		}
	}
</script>

<style lang="scss">
	.page-wrap {
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;

		.content-wrap {
			flex: 1;
			overflow: auto;
			padding-top: 8px;

			// 用户信息
			.user-info-wrap {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-bottom: 16px;

				.avatar {
					width: 60px;
					height: 60px;
				}

				.user-name {
					font-size: 16px;
					font-weight: 600;
				}
			}

			// 结果数据
			.data-list-wrap {}
		}
	}
</style>