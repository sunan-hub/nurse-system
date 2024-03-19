// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: { //存放状态
		evaluateFormData: {},
		miniCogData: {},
		evaluateFormItems: [{
				label: '名字',
				key: 'name',
				type: 'input'
			},
			{
				label: '性别',
				key: 'sex',
				type: 'radio',
				options: [{
					label: '男',
					value: '1',
				}, {
					label: '女',
					value: '0',
				}]
			},
			{
				label: '年龄',
				key: 'age',
				type: 'number'
			},
			{
				label: '身高',
				key: 'height',
				type: 'number'
			},
			{
				label: '体重',
				key: 'weight',
				type: 'number'
			},
			{
				label: '出生地',
				key: 'birthplace',
				type: 'input'
			},
			{
				label: '长期居住地',
				key: 'city',
				type: 'radio',
				options: [{
					label: '城市',
					value: 'city',
				}, {
					label: '农村',
					value: 'village',
				}]
			},
			{
				label: '职业',
				key: 'career',
				type: 'checkbox',
				options: [{
					label: '家公务员',
					value: '1',
				}, {
					label: '专业技术人员',
					value: '2',
				}, {
					label: '农、林、牧、渔业人员',
					value: '3',
				}, {
					label: '社会生产和生活服务人员',
					value: '4',
				}, {
					label: '其他不便分类的从业人员',
					value: '5',
				}]
			},
			{
				label: '毒药物接触史',
				key: 'drug',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
			},
			{
				label: '具体毒药物接触史',
				key: 'specificDrug',
				type: 'input',
				showCondition: {
					key: 'drug',
					value: '1'
				}
			},
			{
				label: '长期滥用药物史',
				key: 'longSpecific',
				type: 'input',
			},
			{
				label: '吸烟史',
				key: 'smoking',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
			},
			{
				label: '吸烟几年',
				key: 'smokingYears',
				type: 'number',
				showCondition: {
					key: 'smoking',
					value: '1'
				}
			},
			{
				label: '每天几支烟',
				key: 'cigarettesDay',
				type: 'number',
				showCondition: {
					key: 'smoking',
					value: '1'
				}
			},
			{
				label: '是否戒烟',
				key: 'quitSmoking',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
				showCondition: {
					key: 'smoking',
					value: '1'
				}
			},
			{
				label: '饮酒史',
				key: 'drinking',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
				showCondition: {
					key: 'smoking',
					value: '1'
				}
			},
			{
				label: '饮酒几年',
				key: 'drinkingYears',
				type: 'number',
				showCondition: {
					key: 'smoking',
					value: '1'
				}
			},
			{
				label: '每天几多酒',
				key: 'drinksDay',
				type: 'number',
				showCondition: {
					key: 'smoking',
					value: '1'
				}
			},
			{
				label: '是否戒酒',
				key: 'quitDrinking',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
				showCondition: {
					key: 'drinking',
					value: '1'
				}
			},
			{
				label: '兴趣爱好',
				key: 'hobbies',
				type: 'radio',
				options: [{
					label: '游泳',
					value: '0',
				}, {
					label: '羽毛球',
					value: '1',
				}, {
					label: '跑步',
					value: '2',
				}, {
					label: '乒乓球',
					value: '3',
				}],
			},
			{
				label: '兴趣爱好_智力游戏',
				key: 'puzzle',
				type: 'input'
			},
			{
				label: '兴趣爱好_音乐',
				key: 'music',
				type: 'input'
			},
			{
				label: '兴趣爱好_乐器',
				key: 'musicalInstruments',
				type: 'input'
			},
			{
				label: '兴趣爱好_其他',
				key: 'otheInstruments',
				type: 'input'
			},
			{
				label: '饮食习惯',
				key: 'dietaryHabit',
				type: 'radio',
				options: [{
					label: '高盐高脂',
					value: '0',
				}, {
					label: '高蛋白饮食',
					value: '1',
				}, {
					label: '清淡',
					value: '2',
				}, {
					label: '素食',
					value: '3',
				}, {
					label: '夜宵',
					value: '4',
				}],
			},
			{
				label: '生活习惯_按时刷牙',
				key: 'brushTeeth',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
			},
			{
				label: '生活习惯_熬夜',
				key: 'stayUp',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
			},
			{
				label: '生活习惯_睡眠障碍',
				key: 'somnipathy',
				type: 'radio',
				options: [{
					label: '入睡困难',
					value: '0',
				}, {
					label: '易醒',
					value: '1',
				}, {
					label: '多梦',
					value: '2',
				}, {
					label: '多尿',
					value: '3',
				}, {
					label: '打鼾',
					value: '4',
				}, {
					label: '其他',
					value: '5',
				}],
			},
			{
				label: '性格',
				key: 'character',
				type: 'radio',
				options: [{
					label: '内向',
					value: '1',
				}, {
					label: '外向',
					value: '0',
				}],
			},
			{
				label: '是否独立处理财务问题',
				key: 'independently',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
			},
			{
				label: '高血压病',
				key: 'hypertension',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
			},
			{
				label: '高血压病_血压控制良好',
				key: 'goodBloodPressureControl',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
				showCondition: {
					key: 'hypertension',
					value: '1'
				}
			},
			{
				label: '高血压病_治疗药',
				key: 'curative',
				type: 'radio',
				options: [{
					label: 'CCB',
					value: '0',
				}, {
					label: 'ACEI',
					value: '1',
				}, {
					label: 'ARB',
					value: '2',
				}, {
					label: 'β受体阻滞剂',
					value: '3',
				}, {
					label: '利尿剂',
					value: '4',
				}],
				showCondition: {
					key: 'hypertension',
					value: '1'
				}
			},
		],
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