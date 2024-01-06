<template>
	<el-card>
		<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
					<el-form-item>
			  <el-input v-model="state.queryForm.title" clearable placeholder="标题"></el-input>
			</el-form-item>
			<el-form-item>
			  <fast-select v-model="state.queryForm.type" dict-type="blog_type" clearable placeholder="类型"></fast-select>
			</el-form-item>
			<el-form-item>
			  <fast-select v-model="state.queryForm.publishStatus" dict-type="publish_status" clearable placeholder="状态"></fast-select>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button v-auth="'sys:legal_knowledge_info:save'" type="primary" @click="addOrUpdateHandle()">新增</el-button>
			</el-form-item>
			<el-form-item>
				<el-button v-auth="'sys:legal_knowledge_info:delete'" type="danger" @click="deleteBatchHandle()">删除</el-button>
			</el-form-item>
		</el-form>
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%" @selection-change="selectionChangeHandle">
			<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
			<el-table-column prop="id" label="编号" header-align="center" align="center"></el-table-column>
			<el-table-column prop="title" label="标题" header-align="center" align="center"></el-table-column>
			<fast-table-column prop="type" label="类型" dict-type="blog_type" header-align="center" align="center"></fast-table-column>
			<el-table-column prop="content" label="内容" header-align="center" align="center"></el-table-column>
			<el-table-column prop="publishDate" label="发布时间" header-align="center" align="center"></el-table-column>
			<el-table-column prop="createDate" label="创建时间" header-align="center" align="center"></el-table-column>
			<fast-table-column prop="publishStatus" label="状态" dict-type="publish_status" header-align="center" align="center"></fast-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
				<template #default="scope">
					<el-button v-auth="'sys:legal_knowledge_info:update'" type="primary" link @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
					<el-button v-auth="'sys:legal_knowledge_info:delete'" type="primary" link @click="deleteBatchHandle(scope.row.id)">删除</el-button>
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

<script setup lang="ts" name="MakuLegal_knowledge_infoIndex">
	import {useCrud} from '@/hooks'
	import {reactive, ref} from 'vue'
	import {IHooksOptions} from '@/hooks/interface'
	import AddOrUpdate from './add-or-update.vue'

	const state: IHooksOptions = reactive({
	dataListUrl: '/sys/legal_knowledge_info/page',
	deleteUrl: '/sys/legal_knowledge_info',
	queryForm: {
	}
})

const addOrUpdateRef = ref()
const addOrUpdateHandle = (id?: number) => {
	addOrUpdateRef.value.init(id)
}

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle, deleteBatchHandle } = useCrud(state)
</script>
