export const stateList = [
	{
		label: '未开始',
		value: 0,
		type: 'primary'
	},
	{
		label: '已完成',
		value: 1,
		type: 'success'
	},
	{
		label: '取消',
		value: '2',
		type: 'info'
	}
]

export const getTimeTag = time => {
	const hour = parseInt(time.split(':')[0])
	if (hour < 12) {
		return '早上'
	} else {
		return '下午'
	}
}
