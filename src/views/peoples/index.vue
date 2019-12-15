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
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>

    </div>
    <!-- 居民查询结果 -->
    <div class="data">
      <el-table :data="tableData" border style="width: 100%;" align="center">
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="nickname" label="昵称" align="center" />
        <el-table-column prop="score" label="总积分" align="center" />
        <el-table-column prop="realName" label="姓名" align="center" />
        <el-table-column prop="sex" label="性别" width="50" align="center" />
        <el-table-column prop="birthday" label="生日" width="95" align="center" />

        <el-table-column prop="phone" label="手机号" width="110" align="center" />

        <el-table-column prop="community" label="小区" align="center" />
        <el-table-column prop="detail" label="详细地址" align="center" />
        <el-table-column prop="applyTime" label="申请时间" width="95" align="center" />

        <el-table-column prop="auditTime" label="审核时间" width="95" align="center" />
        <el-table-column prop="auditStatus" label="审核状态" width="80" align="center" />
        <el-table-column align="center">
          <template slot="header">操作</template>
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="toAudit(scope.$index, scope.row)">审核</el-button>
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
      peoples: {
        name: '',
        phone: '',
        examine: ''
      },
      tableData: [
        {
          nickname: '昵称',
          score: '1290',
          realName: '姓名',
          phone: '13799009933',
          sex: '男',
          birthday: '2019-09-17',
          community: '北辰小区',
          detail: '39-1',
          applyTime: '2019-08-19',
          auditStatus: '通过',
          auditTime: '2020-09-01'
        },
        {
          nickname: '昵称',
          score: '1290',
          realName: '姓名',
          phone: '13799009933',
          sex: '男',
          birthday: '2019-09-17',
          community: '北辰小区',
          detail: '39-1',
          applyTime: '2019-08-19',
          auditStatus: '通过',
          auditTime: '2020-09-01'
        },
        {
          nickname: '昵称',
          score: '1290',
          realName: '姓名',
          phone: '13799009933',
          sex: '男',
          birthday: '2019-09-17',
          community: '北辰小区',
          detail: '39-1',
          applyTime: '2019-08-19',
          auditStatus: '通过',
          auditTime: '2020-09-01'
        }
      ]
    }
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
    toAudit() {
      this.$message('审核!')
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

