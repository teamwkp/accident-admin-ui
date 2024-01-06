<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false">
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="100px" @keyup.enter="submitHandle()">
	    				<el-form-item label="自增id" prop="id">
					<el-input v-model="dataForm.id" placeholder="自增id"></el-input>
				</el-form-item>
				<el-form-item label="预约编号" prop="appointmentCode">
					<el-input v-model="dataForm.appointmentCode" placeholder="预约编号"></el-input>
				</el-form-item>
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
				<el-form-item label="预约服务类型ID" prop="serviceTypeId">
					<el-input v-model="dataForm.serviceTypeId" placeholder="预约服务类型ID"></el-input>
				</el-form-item>
				<el-form-item label="预约服务类型名称" prop="serviceTypeName">
					<el-input v-model="dataForm.serviceTypeName" placeholder="预约服务类型名称"></el-input>
				</el-form-item>
				<el-form-item label="案件日期" prop="caseDate">
					<el-input v-model="dataForm.caseDate" placeholder="案件日期"></el-input>
				</el-form-item>
				<el-form-item label="咨询日期" prop="consultDate">
					<el-input v-model="dataForm.consultDate" placeholder="咨询日期"></el-input>
				</el-form-item>
				<el-form-item label="咨询时间段" prop="consultTime">
					<el-input v-model="dataForm.consultTime" placeholder="咨询时间段"></el-input>
				</el-form-item>
				<el-form-item label="案件描述" prop="describeInfo">
					<el-input v-model="dataForm.describeInfo" placeholder="案件描述"></el-input>
				</el-form-item>
				<el-form-item label="状态" prop="state">
					<el-input v-model="dataForm.state" placeholder="状态"></el-input>
				</el-form-item>
				<el-form-item label="状态变更时间" prop="stateDate">
					<el-input v-model="dataForm.stateDate" placeholder="状态变更时间"></el-input>
				</el-form-item>
				<el-form-item label="创建时间" prop="createDate">
					<el-input v-model="dataForm.createDate" placeholder="创建时间"></el-input>
				</el-form-item>
				<el-form-item label="创建人id" prop="createUser">
					<el-input v-model="dataForm.createUser" placeholder="创建人id"></el-input>
				</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible = false">取消</el-button>
			<el-button type="primary" @click="submitHandle()">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus/es'
import { useAppointment_record_infoApi, useAppointment_record_infoSubmitApi } from '@/api/sys/appointment_record_info'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	appointmentCode:"",
	surname: '',
	firstName: '',
	telephone: '',
	email: '',
	serviceTypeId: '',
	serviceTypeName: '',
	caseDate: '',
	consultDate: '',
	consultTime: '',
	describeInfo: '',
	state: '',
	stateDate: '',
	createDate: '',
	createUser: ''})

const init = (id?: number) => {
	visible.value = true
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
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		useAppointment_record_infoSubmitApi(dataForm).then(() => {
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
