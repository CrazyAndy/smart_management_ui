<template>
  <div class="app-container">
    <div class="activity-add">
      <el-form ref="form" :model="form" label-width="120px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="活动标题">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="活动地点">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="报名人数">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="报名截止时间">
              <el-date-picker
                v-model="form.date1"
                type="date"
                placeholder="选择日期"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="活动时间">
              <el-date-picker v-model="form.value1" type="datetime" placeholder="选择日期时间" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="是否上架">
              <el-switch v-model="form.delivery" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="活动介绍">
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
        value1: '',
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: true,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>

