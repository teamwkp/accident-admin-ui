import service from '@/utils/request'

export const useService_type_infoApi = (id: number) => {
	return service.get('/sys/service_type_info/' + id)
}

export const useService_type_infoSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/sys/service_type_info', dataForm)
	} else {
		return service.post('/sys/service_type_info', dataForm)
	}
}