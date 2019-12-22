<template>
  <div class="app-container">
    <el-button type="primary" @click="goAddGood">发布商品</el-button>
    <!-- 积分商品查询结果 -->
    <div class="data">
      <el-table :data="tableData" border style="width: 100%;" align="center">
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="name" label="商品名称" align="center" />
        <el-table-column prop="stock" label="兑换总量" align="center" />
        <el-table-column prop="needScore" label="所需积分" align="center" />
        <el-table-column prop="reserveStock" label="剩余个数" align="center" />

        <el-table-column align="center">
          <template slot="header">操作</template>
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="onDetail(scope.row.id)">详情</el-button>
            <el-button type="warning" size="mini" @click="onDel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination v-show="total>0" :page-sizes="[listQuery.limit]" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getScoreList, delScoreGood } from '@/api/score'
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
      peoples: {
        name: '',
        phone: '',
        examine: ''
      },
      tableData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    goAddGood() {
      this.$router.push({
        name: 'ScoreGoodAdd'
      })
    },
    onDel(id) {
      delScoreGood(id)
        .then(res => {
          this.$message.success('删除成功')
          this.getList()
        })
        .catch(err => {
          this.$message.success('删除失败')
          console.log(err)
        })
    },
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
      getScoreList(req)
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

