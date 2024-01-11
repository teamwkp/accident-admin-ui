<template>
	<el-card>
		<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item>
				<el-input v-model="state.queryForm.telephone" placeholder="联系电话"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.email" placeholder="邮箱"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.serviceTypeName" placeholder="预约服务类型名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.caseDate" placeholder="案件日期"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.state" placeholder="状态"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button v-auth="'sys:appointment_record_info:save'" type="primary" @click="addOrUpdateHandle()">新增</el-button>
			</el-form-item>
			<el-form-item>
				<el-button v-auth="'sys:appointment_record_info:delete'" type="danger" @click="deleteBatchHandle()">删除</el-button>
			</el-form-item>
		</el-form>
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%" @selection-change="selectionChangeHandle">
			<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
			<el-table-column prop="id" label="编号" header-align="center" align="center"></el-table-column>
			<el-table-column prop="appointment_code" label="预约编号" header-align="center" align="center"></el-table-column>
			<el-table-column prop="surname" label="姓氏" header-align="center" align="center"></el-table-column>
			<el-table-column prop="firstName" label="名字" header-align="center" align="center"></el-table-column>
			<el-table-column prop="telephone" label="联系电话" header-align="center" align="center"></el-table-column>
			<el-table-column prop="email" label="邮箱" header-align="center" align="center"></el-table-column>
			<el-table-column prop="serviceTypeId" label="预约服务类型ID" header-align="center" align="center"></el-table-column>
			<el-table-column prop="serviceTypeName" label="预约服务类型名称" header-align="center" align="center"></el-table-column>
			<el-table-column prop="caseDate" label="案件日期" header-align="center" align="center"></el-table-column>
			<el-table-column prop="consultDate" label="咨询日期" header-align="center" align="center"></el-table-column>
			<el-table-column prop="consultTime" label="咨询时间段" header-align="center" align="center"></el-table-column>
			<el-table-column prop="describeInfo" label="案件描述" header-align="center" align="center"></el-table-column>
			<fast-table-column prop="state" label="状态" dict-type="appointment_status" header-align="center" align="center"></fast-table-column>
			<el-table-column prop="stateDate" label="状态变更时间" header-align="center" align="center"></el-table-column>
			<el-table-column prop="createDate" label="创建时间" header-align="center" align="center"></el-table-column>
			<el-table-column prop="createUser" label="创建人id" header-align="center" align="center"></el-table-column>
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

		<!-- 弹窗, 新增 / 修改 -->
		<add-or-update ref="addOrUpdateRef" @refreshDataList="getDataList"></add-or-update>
	</el-card>
</template>

<script setup lang="ts" name="MakuAppointment_record_infoIndex">
import { useCrud } from '@/hooks'
import { reactive, ref } from 'vue'
import { IHooksOptions } from '@/hooks/interface'
import AddOrUpdate from './add-or-update.vue'

const state: IHooksOptions = reactive({
	dataListUrl: '/sys/appointment_record_info/page',
	deleteUrl: '/sys/appointment_record_info',
	queryForm: {}
})

const addOrUpdateRef = ref()
const addOrUpdateHandle = (id?: number) => {
	addOrUpdateRef.value.init(id)
}

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle, deleteBatchHandle } = useCrud(state)
</script>
