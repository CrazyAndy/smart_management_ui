<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" label="序号" width="50" align="center" />

      <el-table-column label="资讯标题">
        <template slot-scope="{row}">
          <router-link :to="'/example/edit/'+row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="发布时间">
        <template slot-scope="scope">
          <!-- parseTime('{y}-{m}-{d} {h}:{i}') -->
          <span>{{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="资讯类别">
        <template slot-scope="scope">
          <span>{{ scope.row.informationTypeEnum | statusFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="是否置顶" width="110">
        <template slot-scope="{row}">
          {{ row.isCarousel | statusFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="onDetail(scope.row.id)">编辑</el-button>
          <el-button type="warning" size="mini" @click="onDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getArticleList, delArticle } from '@/api/article'
import Pagination from '@/components/Pagination'

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        false: '否',
        true: '是',
        POLICY: '政府政策',
        COMMUNITY_ANNOUNCEMENTS: '社区公告',
        GOODPEOPLE_GOODDEEDS: '好人好事'
      }
      return statusMap[status]
    }
  },
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
  created() {
    this.getList()
  },
  methods: {
    onDel(id) {
      delArticle(id)
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
        name: 'ArticleDetail',
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
      getArticleList(req)
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
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
