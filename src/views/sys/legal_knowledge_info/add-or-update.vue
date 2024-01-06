<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false">
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="100px" @keyup.enter="submitHandle()">
	    				<el-form-item label="自增主键" prop="id">
					<el-input v-model="dataForm.id" placeholder="自增主键"></el-input>
				</el-form-item>
				<el-form-item label="标题" prop="title">
					<el-input v-model="dataForm.title" placeholder="标题"></el-input>
				</el-form-item>
				<el-form-item label="类型" prop="type">
					<el-input v-model="dataForm.type" placeholder="类型"></el-input>
				</el-form-item>
				<el-form-item label="内容" prop="content">
					<el-input v-model="dataForm.content" placeholder="内容"></el-input>
				</el-form-item>
				<el-form-item label="发布时间" prop="publishDate">
					<el-input v-model="dataForm.publishDate" placeholder="发布时间"></el-input>
				</el-form-item>
				<el-form-item label="创建时间" prop="createDate">
					<el-input v-model="dataForm.createDate" placeholder="创建时间"></el-input>
				</el-form-item>
				<el-form-item label="发布状态 0：隐藏 1：发布" prop="publishStatus">
					<el-input v-model="dataForm.publishStatus" placeholder="发布状态 0：隐藏 1：发布"></el-input>
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
import { useLegal_knowledge_infoApi, useLegal_knowledge_infoSubmitApi } from '@/api/sys/legal_knowledge_info'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	title: '',
	type: '',
	content: '',
	publishDate: '',
	createDate: '',
	publishStatus: ''})

const init = (id?: number) => {
	visible.value = true
	dataForm.id = ''

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}

	if (id) {
		getLegal_knowledge_info(id)
	}
}

const getLegal_knowledge_info = (id: number) => {
	useLegal_knowledge_infoApi(id).then(res => {
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

		useLegal_knowledge_infoSubmitApi(dataForm).then(() => {
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
