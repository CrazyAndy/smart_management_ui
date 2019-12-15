<template>
  <div class="app-container">
    <!-- 居民查询结果 -->
    <div class="data">
      <el-table :data="tableData" border style="width: 100%;" align="center">
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="name" label="商品名称" align="center" />
        <el-table-column prop="count" label="兑换总量" align="center" />
        <el-table-column prop="score" label="所需积分" align="center" />
        <el-table-column prop="surplus" label="剩余个数" align="center" />

        <el-table-column align="center">
          <template slot="header">操作</template>
          <template>
            <el-button type="success" size="mini">详情</el-button>
            <el-button type="warning" size="mini">删除</el-button>
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
          name: '超市全场50员代金券',
          count: '128',
          score: '500',
          surplus: '100'
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

