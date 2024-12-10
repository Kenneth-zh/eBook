<template>
  <el-form
    ref="postForm"
    :model="postForm"
    :rules="rules"
    class="form-container"
  >
    <sticky :class-name="'sub-navbar'">
      <el-button v-if="!isEdit" @click="showGuide">显示帮助</el-button>
      <el-button
        v-loading="loading"
        type="success"
        style="margin-left: 10px"
        @click="submitForm"
      >
        {{ isEdit ? "编辑电子书" : "新增电子书" }}
      </el-button>
    </sticky>
    <div class="detail-container">
      <el-row>
        <warning />
        <el-col :span="24">
          <ebook-upload
            :file-list="fileList"
            :disabled="isEdit"
            @onSuccess="onUploadSuccess"
            @onRemove="onUploadRemove"
          />
        </el-col>
        <el-col :span="24">
          <el-form-item prop="title">
            <MdInput
              v-model="postForm.title"
              :maxlength="100"
              name="name"
              required
            >
              书名
            </MdInput>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="作者："
                :label-width="labelWidth"
                prop="author"
              >
                <el-input v-model="postForm.author" placeholder="作者" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="出版社："
                :label-width="labelWidth"
                prop="publisher"
              >
                <el-input v-model="postForm.publisher" placeholder="出版社" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="语言："
                :label-width="labelWidth"
                prop="language"
              >
                <el-input v-model="postForm.language" placeholder="语言" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="根文件：" :label-width="labelWidth">
                <el-input
                  v-model="postForm.rootFile"
                  placeholder="根文件"
                  disabled
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="文件路径：" :label-width="labelWidth">
                <el-input
                  v-model="postForm.filePath"
                  placeholder="文件路径"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="解压路径：" :label-width="labelWidth">
                <el-input
                  v-model="postForm.unzipPath"
                  placeholder="解压路径"
                  disabled
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="封面路径：" :label-width="labelWidth">
                <el-input
                  v-model="postForm.filePath"
                  placeholder="封面路径"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="文件名称：" :label-width="labelWidth">
                <el-input
                  v-model="postForm.originalName"
                  placeholder="文件名称"
                  disabled
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="封面：" :label-width="labelWidth">
                <a v-if="postForm.cover" :href="postForm.cover" target="_blank">
                  <img :src="postForm.cover" class="preview-img" />
                </a>
                <span v-else>暂无数据</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="目录：" :label-width="labelWidth">
                <div
                  v-if="postForm.contents && postForm.contents.length > 0"
                  class="contents-wrapper"
                >
                  <el-tree :data="contentsTree" @node-click="onContentClick" />
                </div>
                <span v-else>无</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>

<script>
import Sticky from "../../../components/Sticky";
import Warning from "./Warning";
import EbookUpload from "../../../components/EbookUpload";
import MdInput from "../../../components/MDinput";
import { createBook,getBook,updateBook } from "../../../api/book";

const defaultForm = {
  title: "", // 书名
  author: "", // 作者
  publisher: "", // 出版社
  language: "", // 语种
  rootFile: "", // 根文件路径
  cover: "", // 封面图片URL
  coverPath: "", // 封面图片路径
  fileName: "", // 文件名
  originalName: "", // 文件原始名称
  filePath: "", // 文件所在路径
  unzipPath: "", // 解压文件所在路径
  contents: [], // 目录
};

const fields = {
  title: "标题",
  author: "作者",
  publisher: "出版社",
  language: "语言",
};

export default {
  components: { MdInput, Sticky, Warning, EbookUpload },
  props: {
    isEdit: Boolean,
    default: false,
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === "") {
        /* this.$message({
          message: fields[rule.field] + "为必传项",
          type: "error",
        }); */
        callback(new Error(fields[rule.field] + "为必传项"));
      } else {
        callback();
      }
    };
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback();
        } else {
          this.$message({
            message: "外链url填写不正确",
            type: "error",
          });
          callback(new Error("外链url填写不正确"));
        }
      } else {
        callback();
      }
    };
    return {
      loading: false,
      postForm: {
        ebook_uri: "",
      },
      rules: {
        author: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        publisher: [{ validator: validateRequire }],
        language: [{ validator: validateRequire }],
      },
      fileList: [],
      labelWidth: "120px",
      contentsTree: [],
    };
  },
  created() {
    if (this.isEdit) {
      const fileName = this.$route.params.fileName;
      this.getBookData(fileName);
    }
  },
  methods: {
    getBookData(fileName) {
      getBook(fileName).then((res) => {
        console.log(res.data);
        this.setData(res.data);
      });
    },
    setData(data) {
      const {
        title,
        author,
        publisher,
        language,
        rootFile,
        cover,
        originalName,
        url,
        contents,
        contentsTree,
        fileName,
        coverPath,
        filePath,
        unzipPath,
      } = data;
      this.postForm = {
        ...this.postForm,
        title,
        author,
        publisher,
        language,
        rootFile,
        cover,
        url,
        originalName,
        contents,
        fileName,
        coverPath,
        filePath,
        unzipPath,
      };
      this.contentsTree = contentsTree;
    },
    toDefault() {
      this.fileList = [];
      this.contentsTree = [];
      this.fileList = [];
      this.$refs.postForm.resetfields();
      this.postForm = Object.assign({}, defaultForm);
    },
    onContentClick(data) {
      const { text } = data;
      if (text) {
        window.open(text);
      }
    },
    onUploadSuccess(data) {
      console.log("onUploadSuccess", data);
      this.setData(data);
    },
    onUploadRemove() {
      this.toDefault();
    },
    submitForm() {
      console.log(this.postForm);
      this.$refs.postForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          const book = Object.assign({}, this.postForm);
          delete book.contents;
          if (!this.isEdit) {
            createBook(book)
              .then((response) => {
                console.log("createBook", response);
                this.loading = false;
                this.$notify({
                  title: "成功",
                  message: response.msg,
                  type: "success",
                  duration: 2000,
                });
                this.toDefault();
              })
              .catch(() => {
                this.loading = false;
              });
          } else {
            updateBook(book)
              .then((response) => {
                console.log("updateBook", response);
                this.loading = false;
                this.$notify({
                  title: "成功",
                  message: response.msg,
                  type: "success",
                  duration: 2000,
                });
              })
              .catch(() => {
                this.loading = false;
              });
          }
        } else {
          return false;
        }
      });
    },
    showGuide() {
      console.log("show guide...");
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-container {
  padding: 40px 50px 20px;
  .preview-img {
    width: 200px;
    height: 270px;
  }
}
