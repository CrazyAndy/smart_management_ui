<template>
  <div class="app-container">
    <div class="scoregoods-add">
      <el-form ref="form" :model="form" label-width="120px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="商品名称">
              <el-input v-model="form.name" maxlength="50" :disabled="goodId" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="兑换总量">
              <el-input v-model="form.allowExchangeAmount" maxlength="5" :disabled="goodId" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="兑换所需积分">
              <el-input v-model="form.needScore" maxlength="10" :disabled="goodId" />
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
                <img v-if="form.thumbnailPath" :src="form.thumbnailPath" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="兑换说明">
              <el-input v-model="form.address" type="textarea" :disabled="goodId" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button v-if="!goodId" type="primary" @click="onSubmit">立即发布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { createScoreGood, getScoreGood } from '@/api/score'
export default {
  data() {
    return {
      form: {
        name: '',
        address: '',
        endTime: new Date().getTime(),
        needScore: '',
        startTime: new Date().getTime(),
        stock: '',
        thumbnailPath: '',
        allowExchangeAmount: ''
      },
      goodId: ''
    }
  },
  mounted() {
    this.goodId = this.$route.params.id
    if (this.goodId) {
      this.getScoreGoodDetail(this.goodId)
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.form.thumbnailPath = res
      console.log('上传图片地址：', this.form.thumbnailPath)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isLt2M
    },
    // 获取商品详情
    getScoreGoodDetail(id) {
      getScoreGood(id)
        .then(res => {
          console.log(res)
          this.form = res
          this.form.address = res.applyForGoodsRuleDetail.address
          this.form.allowExchangeAmount = res.applyForGoodsRuleDetail.allowExchangeAmount
        }).catch(err => {
          console.log(err)
        })
    },
    onSubmit() {
      const req = this.form
      if (!req.name) {
        this.$message('请输入商品名称')
        return
      }
      if (!req.allowExchangeAmount) {
        this.$message('请输入兑换总量')
        return
      }
      if (!req.needScore) {
        this.$message('请输入兑换所需积分')
        return
      }
      if (!req.thumbnailPath) {
        this.$message('请上传商品图片')
        return
      }
      if (!req.address) {
        this.$message('请输入商品说明')
        return
      }
      // req.startTime = this.form.startTime.getTime()
      // req.endTime = this.form.endTime.getTime()
      createScoreGood(req)
        .then(res => {
          this.$message({
            message: '发布商品成功',
            type: 'success',
            onClose: () => {
              console.log('ok')
            }
          })
          this.$router.push({
            name: 'ScoreGoodList'
          })
        })
        .catch(err => {
          this.$message({
            message: '发布商品失败',
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

