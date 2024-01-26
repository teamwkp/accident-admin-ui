<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false">
		<el-form :label-width="110" ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="100px" @keyup.enter="submitHandle()">
			<!-- <el-form-item label="自增id" prop="id">
				<el-input v-model="dataForm.id" placeholder="自增id"></el-input>
			</el-form-item>
			<el-form-item label="预约编号" prop="appointmentCode">
				<el-input v-model="dataForm.appointmentCode" placeholder="预约编号"></el-input>
			</el-form-item> -->
			<el-form-item label="姓氏" prop="surname">
				<el-input v-model="dataForm.surname" placeholder="姓氏"></el-input>
			</el-form-item>
			<el-form-item label="名字" prop="firstName">
				<el-input v-model="dataForm.firstName" placeholder="名字"></el-input>
			</el-form-item>
			<el-form-item label="联系电话" prop="telephone">
				<el-input v-model="dataForm.telephone" placeholder="联系电话"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
			</el-form-item>
			<el-form-item label="预约服务类型" prop="serviceTypeId">
				<el-select v-model="dataForm.serviceTypeId" placeholder="请选择服务类型" style="width: 100%" @change="changeServiceType">
					<el-option v-for="service in serviceTypeList" :key="service.value" :label="service.label" :value="service.value" />
				</el-select>
			</el-form-item>
			<el-form-item label="案件日期" prop="caseDate">
				<el-date-picker
					v-model="dataForm.caseDate"
					type="date"
					placeholder="案件日期"
					format="DD/MM/YYYY"
					value-format="DD/MM/YYYY"
					style="width: 100%"
				/>
			</el-form-item>
			<el-form-item label="咨询日期" prop="consultDate">
				<el-date-picker
					v-model="dataForm.consultDate"
					type="date"
					placeholder="咨询日期"
					format="DD/MM/YYYY"
					value-format="DD/MM/YYYY"
					style="width: 100%"
				/>
			</el-form-item>
			<el-form-item label="咨询时间段" prop="consultTime">
				<el-select v-model="dataForm.consultTime" multiple :multiple-limit="2" placeholder="请选择时间段" style="width: 100%">
					<el-option v-for="consult in consultTimeList" :key="consult.value" :label="consult.label" :value="consult.value" />
				</el-select>
			</el-form-item>
			<el-form-item label="案件描述" prop="describeInfo">
				<el-input v-model="dataForm.describeInfo" placeholder="案件描述"></el-input>
			</el-form-item>
			<el-form-item label="状态" prop="state">
				<el-select v-model="dataForm.state" placeholder="请选择状态" style="width: 100%">
					<el-option v-for="state in stateList" :key="state.value" :label="state.label" :value="state.value" />
				</el-select>
			</el-form-item>
			<!-- <el-form-item label="状态变更时间" prop="stateDate">
				<el-input v-model="dataForm.stateDate" placeholder="状态变更时间"></el-input>
			</el-form-item> -->
			<!-- <el-form-item label="创建时间" prop="createDate">
				<el-input v-model="dataForm.createDate" placeholder="创建时间"></el-input>
			</el-form-item>
			<el-form-item label="创建人id" prop="createUser">
				<el-input v-model="dataForm.createUser" placeholder="创建人id"></el-input>
			</el-form-item> -->
		</el-form>
		<template #footer>
			<el-button @click="visible = false">取消</el-button>
			<el-button type="primary" @click="submitHandle()">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed, watchEffect, watch } from 'vue'
import { ElMessage } from 'element-plus/es'
import { useAppointment_record_infoApi, useAppointment_record_infoSubmitApi, queryAvailablePeriods } from '@/api/sys/appointment_record_info'
import { removeStyle } from 'element-plus/es/utils'
const emit = defineEmits(['update:modelValue', 'refreshDataList'])
const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false
	},
	id: {
		type: Number,
		default: 0
	},
	serviceTypeList: {
		type: Array,
		default: () => []
	}
})
const visible = computed({
	get() {
		return props.modelValue
	},
	set(val) {
		emit('update:modelValue', val)
	}
})
const stateList = [
	{
		label: '未开始',
		value: 0
	},
	{
		label: '已完成',
		value: 1
	},
	{
		label: '取消',
		value: 2
	}
]
const consultTimeList = ref([])
const dataFormRef = ref()

onMounted(async () => {
	init(props.id)
})

const dataForm = reactive({
	id: '',
	// appointmentCode: '',
	surname: '',
	firstName: '',
	telephone: '',
	email: '',
	serviceTypeId: '',
	serviceTypeName: '',
	caseDate: '',
	consultTime: '',
	consultDate: '',
	describeInfo: '',
	state: ''
	// stateDate: ''
	// createDate: '',
	// createUser: ''
})

// 监听服务类型以及咨询日期变化
watch(
	() => dataForm.serviceTypeId,
	async () => {
		if (dataForm.consultDate) {
			getConsultTime()
		}
	}
)
watch(
	() => dataForm.consultDate,
	async () => {
		if (dataForm.serviceTypeId) {
			getConsultTime()
		}
	}
)
const getConsultTime = async () => {
	const { data } = await queryAvailablePeriods()
	consultTimeList.value = data.map((item: any) => {
		return {
			label: item.times,
			value: item.times
		}
	})
}

const init = (id?: number) => {
	dataForm.id = ''
	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}

	if (id) {
		getAppointment_record_info(id)
	}
}

const getAppointment_record_info = (id: number) => {
	useAppointment_record_infoApi(id).then(res => {
		Object.assign(dataForm, { ...res.data, consultTime: res.data.consultTime.split(',') })
	})
}

const dataRules = reactive({
	surname: [{ required: true, message: '请输入姓氏' }],
	firstName: [{ required: true, message: '请输入名字' }],
	telephone: [
		{ required: true, message: '请输入联系电话' },
		{ pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '请输入正确的手机号' }
	],
	email: [
		{ required: false, message: '请输入邮箱' },
		{ pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱' }
	],
	serviceTypeId: [{ required: true, message: '请选择预约服务类型' }],
	caseDate: [{ required: true, message: '请选择案件日期' }],
	consultDate: [{ required: true, message: '请选择咨询日期' }],
	consultTime: [{ required: true, message: '请选择咨询时间段' }],
	describeInfo: [{ required: true, message: '请输入案件描述' }],
	state: [{ required: true, message: '请选择状态' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}
		dataForm.serviceTypeName = props.serviceTypeList.find((item: any) => item.value == dataForm.serviceTypeId)?.label
		useAppointment_record_infoSubmitApi({ ...dataForm, consultTime: dataForm.consultTime.join(',') }).then(() => {
			ElMessage.success({
				message: '操作成功',
				duration: 500,
				onClose: () => {
					visible.value = false
					emit('refreshDataList')
				}
			})
		})
	})
}

defineExpose({
	init
})
</script>
