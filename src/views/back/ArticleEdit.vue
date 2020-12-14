<template>
  <div class="edit" >

    <div class="main">
      <div class="back">
        <el-button round @click="back" style="opacity: 0.5"
          >返回上一页</el-button
        >
      </div>
      <div class="title" style="opacity: 0.5">
        <el-input v-model="title" placeholder="请输入标题"></el-input>
      </div>

      <div class="img">

        <el-upload
          class="upload-demo"
          action="http://localhost:8888/api/upImg"
          :http-request='upload'
          multiple
          :limit="3"
          >
          <img :src="imgUrl" class="upimg" style="width=100px" alt="404" v-if="imgUrl">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>







<!-- 
        <form action="http://localhost:8888/api/upImg" method="post" enctype="multipart/form-data">
          <input type="file" name="avatar"  @onchange='upload'/>
          <input type="submit" value="提交" />
        </form> -->
      </div>

      <div class="select">
        <el-checkbox-group v-model="category">
          <el-checkbox
            v-for="category in categorys"
            :label="category"
            :key="category"
            >{{ category }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
      <div class="edit_head" style="opacity: 0.5">简介</div>
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入简介"
        v-model="gist"
        style="opacity: 0.5"
      >
      </el-input>
      <div class="edit_head" style="opacity: 0.5">内容 (Markdown编辑器)</div>
      <div>
        <mavon-editor
          v-model="content"
          boxShadow
          shortCut
          :toolbarsFlag="false"
          :ishljs="true"
          class="markdown"
        />
      </div>
      <div class="save_button" style="opacity: 0.8">
        <div>
          <el-button type="primary" @click="saveArticle">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNowDate } from "../../common/public";
import { addArticle, getNowArticle, delectArticle,upImg } from "../../netwoak/demo";
export default {
  mounted() {
    if (this.$route.params.id) {
      getNowArticle(this.$route.params.id).then((res) => {
        console.log(res);
        res = res[0];
        this.title = res.title;
        this.date = res.date;
        this.content = res.content;
        this.gist = res.gist;
        this.category = res.category;
      });
    }
  },
  data() {
    return {
      title: "",
      gist: "",
      content: "",
      category: [],
      categorys: [
        "JavaScript",
        "ES6",
        "jQuery",
        "css",
        "ajax",
        "http",
        "https",
        "websocket",
        "apache",
        "Vue",
        "react",
        "react-native",
        "android",
        "node",
        "mongo",
        "CentOS",
        "webpack",
        "NW.js",
        "Electron",
        "easyUI",
        "ECharts",
        "wx",
        "HBuilder",
      ],
      imgUrl: ''
    };
  },
  methods: {
    upload(file) {
     console.log(file)
      let formData = new FormData
      formData.append('file', file.file)
      // console.log(formData.get('file'))
      upImg(formData).then(res => {
        console.log(res)
        this.imgUrl = res.url
      }).catch((err) => {
        console.log(err)
      })
    },



    back() {
      this.$router.go(-1);
    },
    saveArticle() {
      //保存
      if (this.title.length == 0) {
        this.$notify({
          title: "提醒",
          message: "请输入标题",
          type: "warning",
        });
        return;
      }
      if (this.content.length === 0) {
        this.$notify({
          title: "提醒",
          message: "请输入内容",
          type: "warning",
        });
        return;
      }
      if (this.category.length === 0) {
        this.$notify({
          title: "提醒",
          message: "请选择分类",
          type: "warning",
        });
        return;
      }
      if (this.gist.length === 0) {
        this.$notify({
          title: "提醒",
          message: "请选择简介",
          type: "warning",
        });
        return;
      }

      let obj = {
        title: this.title,
        date: getNowDate(),
        category: this.category,
        gist: this.gist,
        content: this.content,
        imgUrl: this.imgUrl
        // html:document.querySelector('.v-show-content').innerHTML
      };
      console.log(obj);
      addArticle(obj).then((res) => {
        if (res.status == 1) {
          this.$message({
            message: "发表文章成功",
            type: "success",
          });
        }
        if (this.$route.params.id) {
          //这个地方再加一个时间的更新
          delectArticle(0, { _id: this.$route.params.id });
        }
        this.back();
      });
    },
  },
};
</script>

<style>
.edit {
 width: 100vw;
  height: 100vh;
  position: relative;
  background: url("../../assets//img/blogBackImg.jpg") fixed repeat-y;
  background-size: cover;
  overflow: auto;
}
.bck {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
.bck img {
  width: 100%;
  height: 100%;
  opacity: 0.5;
}
.main {
  position: relative;
  width: 80%;
  margin: 0 auto;
}
.markdown {
  overflow: auto;
}
.save_button {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.upimg {
  width: 400px;
}
</style>