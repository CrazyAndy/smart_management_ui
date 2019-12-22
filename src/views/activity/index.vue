<template>
  <div class="app-container">
    <!-- 居民查询结果 -->
    <div class="data">
      <el-table :data="tableData" border style="width: 100%;" align="center">
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="title" label="活动标题" align="center" />
        <el-table-column prop="address" label="活动地点" align="center" />
        <el-table-column prop="maxNumber" label="报名人数上限" align="center" />
        <el-table-column prop="hasNumber" label="已报名人数" align="center" />

        <el-table-column prop="activityTime" label="活动举行时间" width="105" align="center" />
        <el-table-column prop="maxTime" label="报名截止时间" width="105" align="center" />
        <el-table-column prop="pubdate" label="活动发布时间" width="105" align="center" />

        <el-table-column align="center">
          <template slot="header">操作</template>
          <template>
            <el-button type="success" size="mini" @click="onDetail">详情</el-button>
            <el-button type="warning" size="mini" @click="onDel">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          title: '社区亲子活动',
          activityTime: '2019-09-17 14:30:00',
          address: '洪湖里小区',
          maxNumber: '100',
          hasNumber: '89',
          maxTime: '2019-09-17 23:59:59',
          pubdate: '2019-09-17 10:19:20'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped>

.data {
  margin-top: 30px;
}
</style>

