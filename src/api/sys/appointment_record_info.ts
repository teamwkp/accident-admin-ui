import service from '@/utils/request'

export const useAppointment_record_infoApi = (id: number) => {
	return service.get('/sys/appointment_record_info/' + id)
}

export const useAppointment_record_infoSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/sys/appointment_record_info', dataForm)
	} else {
		return service.post('/sys/appointment_record_info', dataForm)
	}
}

export const useService_type_infoApi = () => {
	return service.get('/sys/service_type_info/list')
}

export const queryAvailablePeriods = (params: any) => {
	return service.get(`/sys/appointment_record_info/queryAvailablePeriods?serviceTypeId=${params.serviceTypeId}&consultDate=${params.consultDate}`)
}
