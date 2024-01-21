<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useAppointment_record_infoSubmitApi } from '@/api/sys/appointment_record_info'
const emits = defineEmits(['close'])
const props = defineProps({
	detailInfo: {
		type: Object,
		default: () => {
			return []
		}
	}
})
const detail = ref(JSON.parse(JSON.stringify(props.detailInfo.event.extendedProps)))
const close = () => {
	emits('close')
}
const changeState = async (state: any) => {
	try {
		await useAppointment_record_infoSubmitApi({
			id: props.detailInfo.event.id,
			state
		})
		ElMessage({
			type: 'success',
			message: '修改成功'
		})
	} catch (err) {
		console.log(err)
	}
}
</script>
<template>
	<div class="view-detail">
		<div class="left">
			<div class="title">基本信息</div>
			<ul>
				<li>
					<div>订单号</div>
					<div>#{{ detail.appointmentCode }}</div>
				</li>
				<li>
					<div>订单日期</div>
					<div>{{ detail.createDate }}</div>
				</li>
				<li>
					<div>订单状态</div>
					<div>
						<el-radio-group v-model="detail.state" size="small" @change="changeState">
							<el-radio-button :label="0">未开始</el-radio-button>
							<el-radio-button :label="1">已完成</el-radio-button>
							<el-radio-button :label="2">取消</el-radio-button>
						</el-radio-group>
					</div>
				</li>
			</ul>
			<div class="title" style="margin-top: 20px">预约详情</div>
			<ul>
				<li>
					<div>服务</div>
					<div>{{ detail.serviceTypeName }}</div>
				</li>
				<li>
					<div>预约时间</div>
					<div>{{ detail.consultDate }} {{ detail.consultTime }}</div>
				</li>
				<li>
					<div>案件时间</div>
					<div>{{ detail.caseDate }}</div>
				</li>
			</ul>
			<div style="margin-top: 20px; color: #999">描述</div>
			<div style="margin-top: 10px">{{ detail.describeInfo }}</div>
		</div>
		<div class="right">
			<div class="title">联系方式</div>
			<ul>
				<li>
					<div>姓名</div>
					<div>{{ detail.surname }}{{ detail.firstName }}</div>
				</li>
				<li>
					<div>邮箱</div>
					<div>{{ detail.email }}</div>
				</li>
				<li>
					<div>手机号</div>
					<div>{{ detail.telephone }}</div>
				</li>
			</ul>
			<el-row v-if="false" style="margin-top: 20px" justify="end">
				<el-space>
					<el-button size="small" @click="close">返回</el-button>
					<el-button style="margin-left: 10px" size="small" type="primary">保存</el-button>
				</el-space>
			</el-row>
		</div>
	</div>
</template>
<style scoped lang="scss">
.view-detail {
	display: flex;
	width: 100%;
	height: 600px;
	.title {
		font-size: 16px;
	}
	ul {
		padding-top: 20px;
		li {
			margin-bottom: 15px;
			div:first-child {
				color: #999;
			}
			div:last-child {
				font-size: 14px;
				margin-top: 5px;
			}
		}
	}
	.left {
		flex: 1;
		ul {
			width: 100%;
			display: flex;
			li {
				flex: 1;
			}
		}
	}
	.right {
		height: calc(100vh - 80px);
		border-left: 1px #eee solid;
		padding-left: 20px;
		width: 200px;
	}
}
</style>
