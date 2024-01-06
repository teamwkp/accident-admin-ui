<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false">
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="100px" @keyup.enter="submitHandle()">
	    				<el-form-item label="自增id" prop="id">
					<el-input v-model="dataForm.id" placeholder="自增id"></el-input>
				</el-form-item>
				<el-form-item label="服务名称" prop="serviceName">
					<el-input v-model="dataForm.serviceName" placeholder="服务名称"></el-input>
				</el-form-item>
				<el-form-item label="时长" prop="time">
					<el-input v-model="dataForm.time" placeholder="时长"></el-input>
				</el-form-item>
				<el-form-item label="可用时间開始" prop="avaliableStart">
					<el-input v-model="dataForm.avaliableStart" placeholder="可用时间開始"></el-input>
				</el-form-item>
				<el-form-item label="可用时间結束" prop="avaliableEnd">
					<el-input v-model="dataForm.avaliableEnd" placeholder="可用时间結束"></el-input>
				</el-form-item>
				<el-form-item label="槽位" prop="slot">
					<el-input v-model="dataForm.slot" placeholder="槽位"></el-input>
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
import { useService_type_infoApi, useService_type_infoSubmitApi } from '@/api/sys/service_type_info'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	serviceName: '',
	time: '',
	avaliableStart: '',
	avaliableEnd: '',
	slot: ''})

const init = (id?: number) => {
	visible.value = true
	dataForm.id = ''

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}

	if (id) {
		getService_type_info(id)
	}
}

const getService_type_info = (id: number) => {
	useService_type_infoApi(id).then(res => {
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

		useService_type_infoSubmitApi(dataForm).then(() => {
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
