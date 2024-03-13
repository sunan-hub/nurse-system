<template>
	<view class="pages">
		<view class="navbar" :style="{ paddingTop: safeAreaInsets ? safeAreaInsets.top + 5 +'px' : '0' }">
		<text class="navtext">{{quantityTable}}</text>
		</view>
	
		
		
	<uni-list>
		<uni-list-item v-for="item in itemList" :key="item.title" :title="item.title" :note="item.note" rightText="修改" :thumb="item.thumb" :thumb-size="item.thumbSize" showArrow  link="navigateTo" :to="item.to"/>
	</uni-list>
						
		
	</view>	

	
	
</template>

<script>
export default {
  data() {
    return {
      safeAreaInsets: null,
	  quantityTable: "我的",
	  itemList: [
	    { title: 'id', note: '列表描述信息',  thumb: '/static/nurse.png', thumbSize: 'lg', to:'/pages/test/test' },
	    { title: '修改资料', note: '列表描述信息',  thumb: '/static/psw.png',thumbSize: 'lg' ,to:'/pages/test/test'},
	    { title: '反馈建议', note: '列表描述信息', thumb: '/static/feedback.png',thumbSize: 'lg',to:'/pages/test/test' },
		{ title: '联系客服', note: '列表描述信息', thumb: '/static/service.png',thumbSize: 'lg' ,to:'/pages/test/test'},
	    { title: '退出登录', note: '列表描述信息', thumb: '/static/logout.png',thumbSize: 'lg',to:'/pages/test/test' },
	  ]
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
	// onClick(e) {
	// 	uni.showToast({
	// 		title: '点击反馈'
	// 	});
		// uni.navigateTo({
		// 	url: '/pages/test/test',
		// 	 success: (res) => {
		// 	      console.log('跳转成功', res);
		// 	    },
		// 	    fail: (err) => {
		// 	      console.log('跳转失败', err);
		// 	    },
		// });
	// }

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

.navtext{
	color: white;
}



</style>