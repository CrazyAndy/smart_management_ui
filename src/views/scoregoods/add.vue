<template>
  <div class="app-container">
    <div class="activity-add">
      <el-form ref="form" :model="form" label-width="120px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="商品名称">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="兑换总量">
              <el-input v-model="form.count" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="兑换所需积分">
              <el-input v-model="form.score" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="兑换说明">
              <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即发布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        count: '',
        score: '',
        desc: '',
        pic: ''
      }
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>

