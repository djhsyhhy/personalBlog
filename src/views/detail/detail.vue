<template>
  <div class="detail">
    <div class="title">{{ title }}</div>
    <div class="img">
        <img
          class="img-main"
          :src="imgUrl"
          alt="404"
        />
      </div>
    <div class="article">
      <mavon-editor
        v-model="content"
        default_open="preview"
        defaultOpen="preview"
        :toolbarsFlag="false"
        :subfield="false"
        class="mavon"
      ></mavon-editor>
    </div>
    <div class="time">{{ date }}</div>
    <div class="comment">
      <Comment :comments="comments" @updata="updata" />
    </div>
  </div>
</template>

<script>
import { getNowArticle } from "../../netwoak/demo";
import Comment from "../../components/common/comment/Comment";
export default {
  name: 'Detail',
  components: {
    Comment,
  },
  data() {
    return {
      title: "",
      date: "",
      content: "",
      gist: "",
      category: "",
      comments: [],
      imgUrl: ''
    };
  },
  methods: {
    updata() {
      console.log('gengxin')
       this.getNowArticle(this.$route.params.id)
    },
    getNowArticle(id) {
      getNowArticle(id).then((res) => {
        // console.log(res[0]);
        res = res[0];
        this.title = res.title;
        this.date = res.date;
        this.content = res.content;
        this.gist = res.gist;
        this.category = res.category;
        this.imgUrl = res.imgUrl
        if (res.comments) {
          //评论
          for (let i = 0; i < res.comments.length; i++) {
            res.comments[i]["open"] = false;
            res.comments[i]["to_uid"] = res.comments[i]["from_uid"];
            res.comments[i]["to_uname"] = res.comments[i]["from_uname"];
          }
          this.comments = res.comments.reverse();
        }
      });
    },
  },
  created() {
    this.getNowArticle(this.$route.params.id)
  },
  watch: {
    //监听路由参数变化后刷新页面
    $route: function(to, from) {
      this.updata();
    }
  }
};
</script>


<style scoped>
.detail {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  text-align: center;
  font-size: 30px;
  font-weight: 400;
  margin: 10px 0 20px 10%;
  box-shadow: 10px 5px 5px pink;
  line-height: 50px;
  width: 80%;
  /* margin: 0 auto; */
}
.img {
  width: 60%;
  margin: 0 auto;
  margin-bottom: 20px;
  
}
.img-main {
  width: 100%;
  border-radius: 10px;
}
.article {
  width: 80%;
  margin: 0 auto;
}
.mavon {
  
  z-index: 1;
}
.time {
  text-align: right;
  font-size: 6px;
  width: 80%;
  margin: 0 auto;
  line-height: 30px;
}
.comment {
  width: 80%;
  margin: 0 auto;
}
</style>