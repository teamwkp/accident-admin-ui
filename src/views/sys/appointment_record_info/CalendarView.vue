<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import zhLocale from '@fullcalendar/core/locales/zh-cn'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { INITIAL_EVENTS } from './event-data'

export default defineComponent({
	components: {
		FullCalendar
	},
	data() {
		return {
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
				events: INITIAL_EVENTS,
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
		handleDateSelect() {},
		handleEventClick(item) {
			console.log(item)
		},
		handleEvents(events) {},
		showArg(views) {
			console.log(views)
		}
	}
})
</script>

<template>
	<div class="demo-app">
		<div class="demo-app-main">
			<FullCalendar ref="FullCalendar" class="demo-app-calendar" :options="calendarOptions">
				<template v-slot:eventContent="arg">
					<div v-show="arg.view.type == 'dayGridMonth'" style="text-decoration: line-through" class="month-list" @click="showArg(arg)">
						<el-popover placement="right" :width="200" trigger="hover">
							<template #reference>
								<div>
									早上 {{ arg.timeText }}
									<span style="padding-left: 20px">{{ arg.event.title }}</span>
								</div>
							</template>
							<ul>
								<li>{{ arg.event.title }}</li>
								<li>#{{ arg.event.extendedProps.orderNo }}</li>
								<li>早上 {{ arg.timeText }}</li>
								<li>{{ arg.event.extendedProps.type }}</li>
								<li>{{ arg.event.extendedProps.status }}</li>
							</ul>
						</el-popover>
					</div>
					<div v-show="arg.view.type == 'timeGridWeek'">
						<ul>
							<li>{{ arg.event.title }}</li>
							<li>#{{ arg.event.extendedProps.orderNo }}</li>
							<li>早上 {{ arg.timeText }}</li>
							<li>{{ arg.event.extendedProps.type }}</li>
							<li>{{ arg.event.extendedProps.status }}</li>
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
	&:hover {
		background-color: none;
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
