<template>
	<el-card>
		<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item>
				<el-input v-model="state.queryForm.telephone" placeholder="联系电话" clearable style="width: 140px"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.email" placeholder="邮箱" clearable style="width: 140px"></el-input>
			</el-form-item>
			<el-form-item>
				<el-select v-model="state.queryForm.serviceTypeId" placeholder="请选择预约服务类型" clearable style="width: 180px">
					<el-option v-for="item in serviceTypeList" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-date-picker
					v-model="state.queryForm.caseRangeDate"
					type="datetimerange"
					range-separator="至"
					start-placeholder="案件开始日期"
					end-placeholder="结束日期"
					style="width: 340px"
				/>
			</el-form-item>
			<el-form-item>
				<el-select v-model="state.queryForm.state" placeholder="请选择状态" clearable style="width: 120px">
					<el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button v-auth="'sys:appointment_record_info:save'" type="primary" @click="addOrUpdateHandle(0)">新增</el-button>
			</el-form-item>
			<el-form-item>
				<el-button v-auth="'sys:appointment_record_info:delete'" type="danger" @click="deleteBatchHandle()">删除</el-button>
			</el-form-item>
			<el-form-item>
				<el-radio-group v-model="listType">
					<el-radio-button :label="1">列表</el-radio-button>
					<el-radio-button :label="2">日历</el-radio-button>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<div v-if="listType === 1">
			<el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%" @selection-change="selectionChangeHandle">
				<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
				<el-table-column prop="appointmentCode" label="预约编号" header-align="center" align="center" width="160"></el-table-column>
				<el-table-column prop="surname" label="姓氏" header-align="center" align="center"></el-table-column>
				<el-table-column prop="firstName" label="名字" header-align="center" align="center"></el-table-column>
				<el-table-column prop="telephone" label="联系电话" header-align="center" align="center" width="120"></el-table-column>
				<el-table-column prop="email" label="邮箱" header-align="center" align="center" width="150"></el-table-column>
				<el-table-column prop="serviceTypeName" label="预约服务类型名称" header-align="center" align="center" width="150"></el-table-column>
				<el-table-column prop="caseDate" label="案件日期" header-align="center" align="center" width="100"></el-table-column>
				<el-table-column prop="consultDate" label="咨询日期" header-align="center" align="center" width="100"></el-table-column>
				<el-table-column prop="consultTime" label="咨询时间段" header-align="center" align="center" width="100"></el-table-column>
				<el-table-column prop="describeInfo" label="案件描述" header-align="center" align="center" width="200"></el-table-column>
				<el-table-column prop="state" label="状态" dict-type="appointment_status" width="90" header-align="center" align="center">
					<template #default="{ row }">
						<el-tag :type="stateList.find((item:any) => item.value == row.state)?.type">{{
							stateList.find((item: any) => item.value == row.state)?.label
						}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="stateDate" label="状态变更时间" header-align="center" align="center" width="160"></el-table-column>
				<el-table-column prop="createDate" label="创建时间" header-align="center" align="center" width="160"></el-table-column>
				<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
					<template #default="scope">
						<el-button v-auth="'sys:appointment_record_info:update'" type="primary" link @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
						<el-button v-auth="'sys:appointment_record_info:delete'" type="primary" link @click="deleteBatchHandle(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				:current-page="state.page"
				:page-sizes="state.pageSizes"
				:page-size="state.limit"
				:total="state.total"
				layout="total, sizes, prev, pager, next, jumper"
				@size-change="sizeChangeHandle"
				@current-change="currentChangeHandle"
			>
			</el-pagination>
		</div>
		<calendar-view v-if="listType === 2" :view-data="viewData"></calendar-view>
		<!-- 弹窗, 新增 / 修改 -->
		<add-or-update v-if="visible" :id="_id" v-model="visible" :service-type-list="serviceTypeList" @refresh-data-list="getDataList"></add-or-update>
	</el-card>
</template>

<script setup lang="ts" name="MakuAppointment_record_infoIndex">
import { useService_type_infoApi } from '@/api/sys/appointment_record_info'
import { useCrud } from '@/hooks'
import { onMounted, reactive, ref, toRaw, watch } from 'vue'
import { IHooksOptions } from '@/hooks/interface'
import AddOrUpdate from './add-or-update.vue'
import CalendarView from './CalendarView.vue'
import { stateList } from './data.js'
const viewData: any = ref([])
const visible = ref(false)
const _id: any = ref('')
const state: IHooksOptions = reactive({
	dataListUrl: '/sys/appointment_record_info/page',
	deleteUrl: '/sys/appointment_record_info',
	queryForm: {
		startTime: new Date().getTime(),
		endTime: new Date().getTime()
	}
})

// 列表和日历类型
function convertTo24HourFormat(time: any) {
	const [hour, minute, suffix] = time.split(/:|\s/)
	let convertedHour = parseInt(hour, 10)

	if (suffix === 'PM' && convertedHour !== 12) {
		convertedHour += 12
	} else if (suffix === 'AM' && convertedHour === 12) {
		convertedHour = 0
	}

	const formattedHour = convertedHour.toString().padStart(2, '0')
	const formattedMinute = minute.toString().padStart(2, '0')

	return `${formattedHour}:${formattedMinute}`
}
const listType = ref(1)
watch(listType, val => {
	if (val === 2) {
		viewData.value = toRaw(state.dataList)?.map((item: any) => {
			const startTime = item.consultTime.split('-')[0]
			const endTime = item.consultTime.indexOf(',') > -1 ? item.consultTime.split('-')[2].trim() : item.consultTime.split('-')[1].trim()
			const date = (item.caseDate || item.consultDate).split('/')
			const caseDate = `${date[2]}-${date[1]}-${date[0]}`
			const consultTime =
				item.consultTime.indexOf(',') > -1 ? item.consultTime.split('-')[0] + '-' + item.consultTime.split('-')[2] : item.consultTime
			return {
				...item,
				title: item.describeInfo,
				start: `${caseDate}T${convertTo24HourFormat(startTime.replace(/(\d+:\d+)([AP]M)/g, '$1 $2'))}:00`,
				end: `${caseDate}T${convertTo24HourFormat(endTime.replace(/(\d+:\d+)([AP]M)/g, '$1 $2'))}:00`,
				consultTime
			}
		})
	}
})
// 获取服务类型分类
const serviceTypeList = ref([])
const getServiceType = async () => {
	const { data } = await useService_type_infoApi()
	serviceTypeList.value = data.map((item: any) => {
		return {
			label: item.name,
			value: item.id
		}
	})
}
onMounted(() => {
	getServiceType()
})

const addOrUpdateHandle = (id: any) => {
	_id.value = id
	visible.value = true
}

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle, deleteBatchHandle } = useCrud(state)
</script>
