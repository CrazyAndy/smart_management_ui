<template>
  <div class="app-container">
    <div class="forms">

      <el-form ref="form" :model="peoples" :inline="true" label-width="80px">
        <el-form-item label="姓名:">
          <el-input v-model="peoples.name" placeholder="姓名" />
        </el-form-item>

        <el-form-item label="手机号:">
          <el-input v-model="peoples.phone" placeholder="手机号" />
        </el-form-item>

        <el-form-item label="审核状态:">
          <el-select v-model="peoples.examine" placeholder="审核状态">
            <el-option label="全部" value="0" />
            <el-option label="待审核" value="1" />
            <el-option label="审核通过" value="2" />
            <el-option label="审核拒绝" value="3" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getAllUserData(1)">查询</el-button>
        </el-form-item>
      </el-form>

    </div>
    <!-- 居民查询结果 -->
    <div class="data">
      <el-table :data="tableData" border style="width: 100%;" align="center">
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="nickName" label="昵称" align="center" />
        <el-table-column prop="version" label="总积分" align="center" />
        <el-table-column prop="realName" label="姓名" align="center" />
        <el-table-column label="性别" width="50" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.gender | userFilter }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="birthday" label="生日" width="95" align="center" />

        <el-table-column prop="mobile" label="手机号" width="110" align="center" />

        <el-table-column prop="village.villageName" label="小区" align="center" />
        <!-- <el-table-column prop="detail" label="详细地址" align="center" /> -->
        <el-table-column label="住户类型" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.residentTypeEnum | userFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="申请时间" width="95" align="center" />

        <el-table-column prop="updatedAt" label="审核时间" width="95" align="center" />
        <el-table-column label="审核状态" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.applyForTypeEnum | userFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot="header">操作</template>
          <template slot-scope="scope">
            <el-button type="success" size="mini" :disabled="scope.row.applyForTypeEnum === 'APPROVED'" @click="toAudit(scope.$index, scope.row)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination v-show="total>0" :page-sizes="[listQuery.limit]" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getAllUserData" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getAllUser, auditUser } from '@/api/user'
export default {
  name: 'Peoples',
  components: { Pagination },
  filters: {
    userFilter(status) {
      const statusMap = {
        MALE: '男',
        FEMALE: '女',
        TENANT: '租户',
        HOUSEHOLD: '住户',
        APPLYING: '审核中',
        APPROVED: '审核通过'
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
      peoples: {
        name: '',
        phone: '',
        examine: ''
      },
      tableData: []
    }
  },
  mounted() {
    this.getAllUserData()
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    toAudit(index, row) {
      this.$alert('确认审核通过？', '审核确认', {
        confirmButtonText: '审核通过',
        callback: action => {
          auditUser(row)
            .then(res => {
              if (!res) {
                this.$message({
                  message: '审核完成',
                  type: 'success'
                })
                this.getAllUserData()
              }
            })
            .catch(err => {
              this.$message({
                message: '审核失败，请稍后重试',
                type: 'warning'
              })
              console.log(err)
            })
        }
      })
      // this.$message('审核!')
    },
    // 获取所有居民
    getAllUserData(setInit) {
      this.listLoading = true
      if (setInit === 1) { this.listQuery.page = 1 }
      const req = {
        pageNum: this.listQuery.page - 1,
        size: this.listQuery.limit
      }
      getAllUser(req)
        .then(res => {
          console.log(res)
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
.line {
  text-align: center;
}
.forms {
  margin-top: 20px;
}
.data {
  margin-top: 30px;
}

</style>

