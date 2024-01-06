import service from '@/utils/request'

export const useLegal_knowledge_infoApi = (id: number) => {
	return service.get('/sys/legal_knowledge_info/' + id)
}

export const useLegal_knowledge_infoSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/sys/legal_knowledge_info', dataForm)
	} else {
		return service.post('/sys/legal_knowledge_info', dataForm)
	}
}