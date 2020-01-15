<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" class="form-container">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="10">
            <el-form-item style="margin-bottom: 40px;" label-width="80px" label="资讯标题:">
              <el-input v-model="postForm.title" :rows="1" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item style="margin-bottom: 40px;" label-width="100px" label="资讯类型:">
              <el-select v-model="postForm.informationTypeEnum" placeholder="请选择">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label-width="80px" label="是否置顶:">
              <el-radio v-model="postForm.isCarousel" :label="false">否</el-radio>
              <el-radio v-model="postForm.isCarousel" :label="true">是</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="8" />
        </el-row>

        <!-- <el-form-item prop="image_uri" style="margin-bottom: 30px;">
          <Upload v-model="postForm.carouselImagePath" />
        </el-form-item> -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="资讯图片">
              <el-upload
                class="avatar-uploader"
                name="imageFile"
                action="//dongwuzhijia.com/bms/v1/infra/image/uploadImage"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="postForm.carouselImagePath" :src="postForm.carouselImagePath" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" :width="800" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即发布</el-button>
        </el-form-item>

      </div>

    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage3'
import { createArticle, getArticleDetail, updateArticle } from '@/api/article'

export default {
  name: 'ArticleDetail',
  // eslint-disable-next-line vue/no-unused-components
  components: { Tinymce, Upload },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: {
        id: '',
        title: '', // 文章题目
        content: '', // 文章内容
        carouselImagePath: '', // 文章图片
        isCarousel: false,
        informationTypeEnum: ''
      },
      typeOptions: [{
        value: 'POLICY',
        label: '政府政策'
      }, {
        value: 'COMMUNITY_ANNOUNCEMENTS',
        label: '社区公告'
      }, {
        value: 'GOODPEOPLE_GOODDEEDS',
        label: '好人好事'
      }]
    }
  },
  computed: {},
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.postForm.carouselImagePath = res
      console.log('上传图片地址：', this.postForm.carouselImagePath)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isLt2M
    },
    fetchData(id) {
      getArticleDetail(id)
        .then(res => {
          this.postForm = res
        })
        .catch(err => {
          console.log(err)
        })
    },
    onSubmit() {
      const req = this.postForm
      if (!req.title) {
        this.$message('请输入资讯标题')
        return
      }
      if (!req.informationTypeEnum) {
        this.$message('请选择资讯类型')
        return
      }
      if (!req.carouselImagePath) {
        this.$message('请上传资讯图片')
        return
      }
      if (!req.content) {
        this.$message('请输入文章内容')
        return
      }
      // 判断是否为编辑
      if (this.isEdit) {
        updateArticle(req)
          .then(res => {
            this.$message({
              message: '更新成功',
              type: 'success',
              onClose: () => {
                console.log('ok')
              }
            })
            this.$router.push({
              name: 'AriticleList'
            })
          })
          .catch(err => {
            this.$message({
              message: '更新失败',
              type: 'warning'
            })
            console.log(err)
          })
      } else {
        createArticle(req)
          .then(res => {
            this.$message({
              message: '发布成功',
              type: 'success',
              onClose: () => {
                console.log('ok')
              }
            })
            this.$router.push({
              name: 'AriticleList'
            })
          })
          .catch(err => {
            this.$message({
              message: '发布失败',
              type: 'warning'
            })
            console.log(err)
          })
      }
    }

  }
}
</script>

<style lang="scss">
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
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
