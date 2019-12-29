<template>
  <div class="app-container">
    <el-button type="primary" @click="goAddActivity">发布活动</el-button>
    <!-- 居民查询结果 -->
    <div class="data">
      <el-table :data="tableData" border style="width: 100%;" align="center">
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="title" label="活动标题" align="center" />
        <el-table-column prop="place" label="活动地点" align="center" />
        <el-table-column prop="peopleLimit" label="报名人数上限" align="center" />
        <el-table-column prop="peopleConfirmed" label="已报名人数" align="center" />

        <el-table-column prop="activityTime" label="活动举行时间" width="105" align="center" />
        <el-table-column prop="endTime" label="报名截止时间" width="105" align="center" />
        <el-table-column prop="startTime" label="活动发布时间" width="105" align="center" />

        <el-table-column align="center">
          <template slot="header">操作</template>
          <template>
            <!-- <el-button type="success" size="mini" @click="onDetail">详情</el-button> -->
            <!-- <el-button type="warning" size="mini" @click="onDel">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination v-show="total>0" :page-sizes="[listQuery.limit]" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getActivityList } from '@/api/activity'
export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      tableData: []
    }
  },
  mounted() {
    this.getList()
  },

  methods: {
    goAddActivity() {
      this.$router.push({
        name: 'ActivityAdd'
      })
    },
    // onDel(id) {
    //   delScoreGood(id)
    //     .then(res => {
    //       this.$message.success('删除成功')
    //       this.getList()
    //     })
    //     .catch(err => {
    //       this.$message.success('删除失败')
    //       console.log(err)
    //     })
    // },
    onDetail(id) {
      this.$router.push({
        name: 'ScoreGoodDetail',
        params: {
          id
        }
      })
    },
    getList(setInit) {
      this.listLoading = true
      if (setInit === 1) { this.listQuery.page = 1 }
      const req = {
        pageNum: this.listQuery.page - 1,
        size: this.listQuery.limit
      }
      getActivityList(req)
        .then(res => {
          this.tableData = res.content
          this.total = res.totalElements
          this.listLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>

.data {
  margin-top: 30px;
}
</style>

