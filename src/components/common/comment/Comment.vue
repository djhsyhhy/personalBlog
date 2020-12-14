<template>
  <div class="comment">
    <div class="myself">
      <el-input
        type="textarea"
        placeholder="请留下你的评论"
        v-model="text"
        maxlength="140"
        show-word-limit
        resize="none"
      ></el-input>
      <el-button
        size="mini"
        style="float: right; margintop: 5px"
        @click="submit"
      >
        评论
        <i class="el-icon-edit el-icon--right"></i>
      </el-button>
    </div>
    <p style="margintop: 30px; fontsize: 14px">精彩评论</p>
    <div class="newComment" v-for="(item, index) in comments" :key="index">
      <div class="userComment">


        <div class="first-com">
          <div class="talk">
            <span style="marginright: 7px">{{ item.from_uname }} :</span>
            <span style="lineheight: 1.5">{{ item.content }}</span>
          </div>

          <div class="doing">
            <div class="time">
              <span>{{ item.date }}</span>
            </div>

            <div><el-button type="text" @click="select(index)">回复</el-button></div>
            <el-dialog title="回复" :visible.sync="dialogFormVisible">
              <el-input
                type="textarea"
                placeholder="请留下你的评论"
                v-model="restext"
                maxlength="140"
                show-word-limit
                resize="none"
              ></el-input>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="reply">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
        <div class="other-com" v-for="(ele, i) in item.children" :key="i">
          <div class="res-talk">
            <span style="marginright: 7px">{{ ele.from_uname }} :</span>
            <span style="lineheight: 1.5">{{ ele.content }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { published, replyComment } from "../../../netwoak/comment";
import { getNowDate } from "../../../common/public";
export default {
  created() {},
  mounted() {
    //
    this.nickName = localStorage.getItem("nickName");
    this.avatar = localStorage.getItem("avatar");
    this.name = localStorage.getItem("user_name");
    this.token = localStorage.getItem("token");
    this.articleId = this.$route.params.id;
  },
  data() {
    return {
      dialogFormVisible: false, //控制回复
      text: "",
      id: 0,
      total: 0,
      nickName: "", //昵称
      name: "", //评论人
      token: "",
      avatar: "",
      articleId: "", //文章id
      restext: "", //回复
      index: "",
    };
  },
  computed: {
    reps() {
      return this.comments.map((item) => item.children);
    },
  },
  props: {
    comments: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    select(index) {
      this.dialogFormVisible = true;
      this.index = index;
    },
    reply() {
      if (!this.restext) {
        this.$message("评论不可以为空哦");
        return;
      }
      if (!this.nickName) {
        this.$message("请先登录");
        return;
      }
      let obj = {
        sign: this.comments[this.index].date,
        _id: this.articleId, //文章id
        from_uid: this.name,
        from_uname: this.nickName,
        avatar: this.avatar,
        content: this.restext,
        date: getNowDate(),
      };
      replyComment(obj).then((res) => {
        if (res.status == 1) {
          this.$message(res.msg);
        }
        this.$emit("updata");
        this.restext = "";
        this.dialogFormVisible = false;
      });
      //得到用户的信息
      //发出请求
    },
    submit() {
      //提交评论
      if (!this.text) {
        this.$message("评论不可以为空哦");
        return;
      }
      if (!this.nickName) {
        this.$message("请先登录");
        return;
      }
      let obj = {
        _id: this.articleId, //文章id
        from_uid: this.name,
        from_uname: this.nickName,
        avatar: this.avatar,
        content: this.text,
        date: getNowDate(),
      };
      published(obj).then((res) => {
        if (res.status == 1) {
          this.$message(res.msg);
        }
        this.$emit("updata");
      });
      //得到用户的信息
      //发出请求
      this.text = "";
    },
  },
};
</script>

<style>
.comment {
  padding-bottom: 20px;
}
.doing {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 12px;
  color: #999;
  display: flex;
}
.doing span {
  margin: 0 8px;
  cursor: pointer;
}
.newComment:hover span.to {
  display: inline-block;
}
.to {
  display: none;
  cursor: pointer;
}
.talk {
  margin: 10px 0 0 5px;
}
.talk span,
.talk a {
  position: relative;
  top: -8px;
}
.myself {
  padding: 20px 0 40px 0;
  background: #f0f0f2;
}
.time {
  line-height: 39px;
}
.newComment {
  margin-top: 10px;
  font-size: 13px;
  position: relative;
}
.userComment {
  margin-top: 5px;
  border-top: 1px solid #f0f0f2;
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.other-com {
  margin: 20px 0 0 20px;
}
</style>