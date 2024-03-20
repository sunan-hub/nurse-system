// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: { //存放状态
		evaluateFormData: {},
		miniCogData: {},
		hisData: {},
		evaluateFormItems: [{
				label: '名字',
				key: 'pationt_name',
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
			// {
			// 	label: '身高',
			// 	key: 'height',
			// 	type: 'number'
			// },
			// {
			// 	label: '体重',
			// 	key: 'weight',
			// 	type: 'number'
			// },
			{
				label: 'bmi',
				key: 'bmi',
				type: 'number'
			},
			{
				label: '出生地',
				key: 'birthplace',
				type: 'input'
			},
			{
					label: '长期居住地',
					key: 'address',
					type: 'input'
				},
			{
				label: '长期居住地（具体）',
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
				type: 'radio',
				options: [{
					label: '国家公务员',
					value: '0',
				}, {
					label: '专业技术人员',
					value: '1',
				}, {
					label: '农、林、牧、渔业人员',
					value: '2',
				}, {
					label: '社会生产和生活服务人员',
					value: '3',
				}, {
					label: '其他不便分类的从业人员',
					value: '4',
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
				key: 'drug_detail',
				type: 'input',
				showCondition: {
					key: 'drug',
					value: '1'
				}
			},
			{
				label: '长期滥用药物史',
				key: 'drug_history',
				type: 'input',
			},
			{
				label: '吸烟史',
				key: 'smoke',
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
				key: 'smoke_age',
				type: 'number',
				showCondition: {
					key: 'smoke',
					value: '1'
				}
			},
			{
				label: '每天几支烟',
				key: 'smoke_avg',
				type: 'number',
				showCondition: {
					key: 'smoke',
					value: '1'
				}
			},
			{
				label: '是否戒烟',
				key: 'smoke_quit',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
				showCondition: {
					key: 'smoke',
					value: '1'
				}
			},
			{
				label: '饮酒史',
				key: 'alcohol',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
				showCondition: {
					key: 'alcohol',
					value: '1'
				}
			},
			{
				label: '饮酒几年',
				key: 'alcohol_age',
				type: 'number',
				showCondition: {
					key: 'alcohol',
					value: '1'
				}
			},
			{
				label: '每天几多酒',
				key: 'alcohol_avg',
				type: 'number',
				showCondition: {
					key: 'alcohol',
					value: '1'
				}
			},
			{
				label: '是否戒酒',
				key: 'alcohol_quit',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
				showCondition: {
					key: 'alcohol',
					value: '1'
				}
			},
			{
				label: '兴趣爱好',
				key: 'hobby',
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
				key: 'hobby_puzzle',
				type: 'input'
			},
			{
				label: '兴趣爱好_音乐',
				key: 'hobby_music',
				type: 'input'
			},
			{
				label: '兴趣爱好_乐器',
				key: 'hobby_Instrument',
				type: 'input'
			},
			{
				label: '兴趣爱好_其他',
				key: 'hobby_others',
				type: 'input'
			},
			{
				label: '饮食习惯',
				key: 'habit_dietary',
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
				key: 'habit_brushteeth',
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
				key: ' habit_stayup',
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
				key: 'habit_sleep',
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
				key: 'personality',
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
				key: 'finance',
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
				key: 'hypertension_control',
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
				key: 'hypertension_medicine',
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
			{
				label: '冠心病',
				key: 'cad',
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
				label: '冠心病_治疗药',
				key: 'cad_medicine',
				type: 'radio',
				options: [{
					label: '阿司匹林肠溶片',
					value: '0',
				}, {
					label: '他汀类',
					value: '1',
				}],
				showCondition: {
					key: 'cad',
					value: '1'
				}
			},
			{
				label: '糖尿病',
				key: 'diabetes',
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
				label: '糖尿病_血糖控制良好',
				key: 'diabetes_control',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
				showCondition: {
					key: 'diabetes',
					value: '1'
				}
			},
			{
				label: '糖尿病_治疗药',
				key: 'diabetes_medicine',
				type: 'radio',
				options: [{
					label: '磺脲类',
					value: '0',
				}, {
					label: '双胍类',
					value: '1',
				},{
					label: 'α糖苷酶抑制剂',
					value: '2',
				}, {
					label: 'SGLT23SGLT2',
					value: '3',
				},{
					label: 'DPP4抑制剂',
					value: '4',
				},{
					label: '胰岛素',
					value: '5',
				}],
				showCondition: {
					key: 'diabetes',
					value: '1'
				}
			},
			{
				label: '家族遗传史',
				key: 'hereditary',
				type: 'radio',
				options: [{
					label: '冠心病',
					value: '0',
				}, {
					label: '高血压病',
					value: '1',
				},{
					label: '糖尿病',
					value: '2',
				}, {
					label: '帕金森病',
					value: '3',
				},{
					label: '痴呆',
					value: '4',
				}],
			},
			{
				label: '家族遗传史_其他',
				key: 'hereditary_others',
				type: 'input'
			},
		],
		hisItems: [
			{
				label: '1、急性起病',
				key: 'acute_onset',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}]
			},
			{
				label: '2、阶梯式恶化',
				key: 'step_deterioration',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}]
			},
			{
				label: '3、波动性病程',
				key: 'fluctuating_course',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}]
			},
			{
				label: '4、夜间意识模糊',
				key: 'unconcisous',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}]
			},
			{
				label: '5、人格相对保持完整',
				key: 'integrate_personalities',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}]
			},
			{
				label: '6、情绪低落',
				key: 'depression',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}]
			},
			{
				label: '7、身体诉述',
				key: 'body_state',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}]
			},
			{
				label: '8、情感失禁',
				key: 'affective_incontinence',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}]
			},
			{
				label: '9、有高血压或高血压史 ',
				key: 'hypertension',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}]
			},
			{
				label: '10、中风史',
				key: 'stroke',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}]
			},
			{
				label: '11、动脉硬化',
				key: 'arteriosclerotic',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}]
			},
			{
				label: '12、局灶神经系统症状',
				key: 'neurological_symptoms',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}]
			},
			{
				label: '13、局灶神经系体征',
				key: 'neurological_signs',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}]
			},]
	},
	mutations: {
		setEvaluateFormData(state, newData) {
			state.evaluateFormData = newData;
		},
		setMiniCogData(state, newData) {
			state.miniCogData = newData;
		},
		setHisData(state, newData) {
			state.hisData = newData;
		},
		// 清除测试数据
		clearTestPageData(state) {
			state.evaluateFormData = {};
			state.miniCogData = {};
		}
	},
})

export default store