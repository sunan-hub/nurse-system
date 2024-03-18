// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: { //存放状态
		evaluateFormData: {},
		miniCogData: {}
	},
	mutations: {
		setEvaluateFormData(state, newData) {
			state.evaluateFormData = newData;
		},
		setMiniCogData(state, newData) {
			state.miniCogData = newData;
		},
		// 清除测试数据
		clearTestPageData(state) {
			state.evaluateFormData = {};
			state.miniCogData = {};
		}
	}
})

export default store