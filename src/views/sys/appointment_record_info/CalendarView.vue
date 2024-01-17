<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import zhLocale from '@fullcalendar/core/locales/zh-cn'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import ViewDetail from './detail.vue'
export default defineComponent({
	components: {
		FullCalendar,
		ViewDetail
	},
	props: {
		viewData: {
			type: Array,
			default: () => {
				return []
			}
		}
	},
	data() {
		return {
			drawerDetail: false,
			detailInfo: {},
			stateList: [
				{
					value: 0,
					label: '未开始'
				},
				{
					value: 1,
					label: '已完成'
				},
				{
					value: 2,
					label: '取消'
				}
			],
			calendarOptions: {
				locale: zhLocale,
				plugins: [dayGridPlugin, timeGridPlugin],
				headerToolbar: {
					left: 'prev,next today',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek'
				},
				views: {
					timeGridWeek: {
						allDaySlot: false
					}
				},
				initialView: 'dayGridMonth',
				events: this.viewData,
				dayMaxEvents: true,
				weekends: true,
				select: this.handleDateSelect, // 点击日期格子
				eventClick: this.handleEventClick, // 点击当前信息
				eventsSet: this.handleEvents,
				eventResize: view => {
					console.log(view.type)
				}
			}
		}
	},
	methods: {
		handleDateSelect(item) {
			console.log(1, item)
		},
		handleEventClick(item) {
			console.log(2, item)
		},
		handleEvents(item) {
			console.log(3, item)
		},
		showDetail(item) {
			this.drawerDetail = true
			this.detailInfo = item
		},
		handleDateChange() {
			console.log(323)
		}
	}
})
</script>

<template>
	<div class="calendar-view">
		<el-drawer v-model="drawerDetail" size="980px" :show-close="false">
			<template #header="{}">
				<div style="cursor: pointer; width: 60px" @click="drawerDetail = false">&lt; 返回</div>
			</template>
			<view-detail :detail-info="detailInfo" @close="drawerDetail = false"></view-detail>
		</el-drawer>
		<div class="demo-app-main">
			<FullCalendar ref="FullCalendar" :options="calendarOptions" @dateClick="handleDateChange">
				<template #eventContent="arg">
					<div v-show="arg.view.type == 'dayGridMonth'" class="month-list complete">
						<el-popover placement="right" :width="400" trigger="hover">
							<template #reference>
								<div>
									早上 {{ arg.timeText }}
									<span style="padding-left: 15px">{{ arg.event.extendedProps.surname }}{{ arg.event.extendedProps.firstName }}</span>
								</div>
							</template>
							<ul class="view-ul">
								<li class="title">基本信息</li>
								<li>
									<div>订单编号</div>
									<div>#{{ arg.event.extendedProps.appointmentCode }}</div>
								</li>
								<li>
									<div>订单日期</div>
									<div>早上 {{ arg.event.extendedProps.createDate }}</div>
								</li>
								<li>
									<div>状态</div>
									<div style="margin-top: 3px">
										<el-radio-group v-model="arg.event.extendedProps.state" size="small">
											<el-radio-button :label="0">未开始</el-radio-button>
											<el-radio-button :label="1">已完成</el-radio-button>
											<el-radio-button :label="2">取消</el-radio-button>
										</el-radio-group>
									</div>
								</li>
							</ul>
							<el-divider></el-divider>
							<ul class="view-ul">
								<li class="title">预约详情</li>
								<li>
									<div>服务项</div>
									<div>{{ arg.event.extendedProps.serviceTypeName }}</div>
								</li>
								<li>
									<div>预约时间</div>
									<div>{{ arg.event.extendedProps.consultDate }}{{ arg.event.extendedProps.consultTime }}</div>
								</li>
								<li>
									<div>案件日期</div>
									<div>{{ arg.event.extendedProps.caseDate }}</div>
								</li>
								<li>
									<div>案件详情</div>
									<div>{{ arg.event.extendedProps.describeInfo }}</div>
								</li>
								<li style="margin-top: 20px">
									<el-link type="primary" :underline="false" @click="showDetail(arg)">查看详情</el-link>
								</li>
							</ul>
						</el-popover>
					</div>
					<div v-show="arg.view.type == 'timeGridWeek'">
						<ul>
							<li>{{ arg.event.extendedProps.surname }}{{ arg.event.extendedProps.firstName }}</li>
							<li>#{{ arg.event.extendedProps.appointmentCode }}</li>
							<li>{{ arg.event.extendedProps.consultTime }}</li>
							<li>{{ arg.event.extendedProps.serviceTypeName }}</li>
							<li>{{ arg.event.extendedProps.stateName }}</li>
						</ul>
					</div>
				</template>
			</FullCalendar>
		</div>
	</div>
</template>

<style>
.fc .fc-timegrid-slot {
	height: 2em;
}
.fc .fc-button {
	padding: 0.2em 0.4em !important;
}
.month-list {
	border: 1px #ccc solid;
	overflow: hidden;
	color: #fff;
	font-size: 12px;
	height: 25px;
	line-height: 25px;
	padding: 0 5px;
	width: 100%;
	background-color: #3788d8;
	border-radius: 4px;
}
.cancel {
	text-decoration: line-through;
}
.complete {
	background-color: #67c23a;
}
.view-ul li {
	margin-top: 5px;
	&.title {
		font-size: 16px;
	}
	div:last-child {
		color: #999;
	}
}
h2 {
	margin: 0;
	font-size: 16px;
}

ul {
	margin: 0;
	padding: 0;
}

li {
	padding: 0;
	list-style: none;
	font-size: 12px;
	line-height: 22px;
}

b {
	/* used for event dates/times */
	margin-right: 3px;
}

.fc {
	/* the calendar root */
	margin: 0 auto;
}
</style>
