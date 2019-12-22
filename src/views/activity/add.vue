<template>
  <div class="app-container">
    <div id="activity-add">
      <el-form ref="form" :model="form" label-width="120px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="活动标题">
              <el-input v-model="form.title" maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="活动地点">
              <el-input v-model="form.place" maxlength="50" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="报名人数">
              <el-input v-model="form.peopleLimit" type="tel" maxlength="5" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="报名截止时间">
              <el-date-picker
                v-model="form.endTime"
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
              <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期时间" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="是否上架">
              <el-switch v-model="form.delivery" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="5">
            <el-form-item label="活动图片">
              <el-upload
                class="avatar-uploader"
                name="imageFile"
                action="//dongwuzhijia.com/bms/v1/infra/image/uploadImage"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="form.promotionalPicture" :src="form.promotionalPicture" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="活动介绍">
              <el-input v-model="form.content" type="textarea" :autosize="{ minRows: 4, maxRows: 10}" />
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
import { createActivity } from '@/api/activity'

export default {
  data() {
    return {
      form: {
        title: '',
        endTime: '',
        peopleLimit: '',
        place: '',
        promotionalPicture: '',
        delivery: true,
        type: [],
        resource: '',
        startTime: ''
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.form.promotionalPicture = res
      console.log('上传图片地址：', this.form.promotionalPicture)
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 5

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isLt2M
    },
    onSubmit() {
      const req = this.form
      if (!req.title) {
        this.$message('请输入活动标题')
        return
      }
      if (!req.place) {
        this.$message('请输入活动地点')
        return
      }
      if (!req.peopleLimit) {
        this.$message('请输入活动人数')
        return
      }
      if (!req.startTime) {
        this.$message('请输入活动时间')
        return
      }
      if (!req.endTime) {
        this.$message('请输入报名截止时间')
        return
      }
      if (!req.promotionalPicture) {
        this.$message('请上传活动图片')
        return
      }
      if (!req.content) {
        this.$message('请输入活动介绍')
        return
      }
      req.startTime = this.form.startTime.getTime()
      req.endTime = this.form.endTime.getTime()
      createActivity(req)
        .then(res => {
          this.$message({
            message: '发布活动成功',
            type: 'success',
            onClose: () => {
              console.log('ok')
            }
          });
          this.$router.push({
            name: 'ActivityList'
          })
        })
        .catch(err => {
          this.$message({
            message: '发布活动失败',
            type: 'warning'
          })
          console.log(err)
        })
    }
  }
}
</script>

<style>

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

