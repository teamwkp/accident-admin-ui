let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
export const INITIAL_EVENTS = [
	{
		id: createEventId(),
		title: '张立',
		start: '2024-01-06T10:30:00',
		end: '2024-01-06T12:30:00',
		orderNo: '19891017',
		type: '个人体检',
		status: '未完成',
		url: '',
		desc: '个人体检'
	},
	{
		id: createEventId(),
		title: '张立',
		start: todayStr + 'T08:30:00',
		end: todayStr + 'T10:30:00',
		orderNo: '19891017',
		type: '个人体检',
		status: '未完成'
	},
	{
		id: createEventId(),
		title: '张立',
		start: todayStr + 'T11:00:00',
		end: todayStr + 'T13:00:00',
		orderNo: '19891017',
		type: '个人体检',
		status: '未完成'
	},
	{
		id: createEventId(),
		title: '张立',
		start: todayStr + 'T14:30:00',
		end: todayStr + 'T16:30:00',
		orderNo: '19891017',
		type: '个人体检',
		status: '已完成'
	}
]

export function createEventId() {
	return String(eventGuid++)
}
