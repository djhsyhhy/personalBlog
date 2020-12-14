<template>
  <div class="articleList">
    <div class="bck">
      <img src="../../assets//img/blogBackImg.jpg" alt="" />
    </div>
    <div class="main">
      <div class="back">
        <el-button round @click="back">返回首页</el-button>
      </div>
      <h1 class="title">{{ type == "article" ? "文章" : "demo列表" }}</h1>
      <div class="btn">
        <div>
          <el-button
            :type="type == 'article' ? 'primary' : 'info'"
            @click="toggle"
            ><i class="iconfont icon-archives"></i> Article</el-button
          >
        </div>
        <div>
          <el-button :type="type == 'user' ? 'primary' : 'info'" @click="toggle"
            ><i class="iconfont icon-play"></i> user</el-button
          >
        </div>
      </div>
      <div class="add">
        <div>
          <el-button @click="handleAdd()" class="btn-add">新增+</el-button>
        </div>
      </div>
      <div v-if="type == 'article'">
        <el-table
          :data="articleList"
          style="width: 100%"
          header-align="right"
          border
          stripe
          class="table"
        >
          <el-table-column label="标题" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column label="日期" width="250">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span>{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="摘要" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.gist.slice(0, 30) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="分类" width="250">
            <template slot-scope="scope">
              <span v-if="scope.row.category.length === 0">未分类</span>
              <el-tag
                v-else
                class="tag_margin"
                type="primary"
                v-for="tag in scope.row.category"
                :key="tag.id"
                >{{ tag }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleLook(scope.$index, scope.row)"
                >查看</el-button
              >
              <el-button
                size="mini"
                type="success"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-if="type == 'user'">
        <el-table
          :data="allUser"
          style="width: 100%"
          header-align="right"
          border
          stripe
        >
          <el-table-column label="姓名" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.nickName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="注册日期" width="200">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span>{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="头像" width="200">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <img :src="scope.row.avatar" alt="404">
            </template>
          </el-table-column>
          
          <el-table-column label="账号" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="密码" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.password }}</span>
            </template>
          </el-table-column>
          
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete2(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle, delectArticle, getAllUser, delectUser } from "../../netwoak/demo";
import {checkToken} from '../../netwoak/token'
export default {
  name: "ArticleList",
  mixins: [checkToken],
  data() {
    return {
      demoList: [],
      type: "article",
      articleList: [],
      allUser: [],
    };
  },
  created() {
    this.getArticle();
    this.getAllUser()
  },
  methods: {
    back() {
      this.$router.push("/home/homeMain");
    },
    toggle() {
      this.type = this.type == "article" ? "user" : "article";
    },
    handleAdd() {
      //增加文章
      this.$router.push("/admin/edit"); //新增文章
    },
    handleLook(index, row) {
      //查看
      let id = row._id;
      window.open("#/detail/" + id);
    },
    handleEdit(index, row) {
      //编辑
      let id = row._id;
      this.$router.push("/admin/edit/" + id);
    },
    handleDelete(index, row) {
      //删除
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log("as");
        delectArticle(index, row).then((res) => {
          if (res.status == 1) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getArticle(); //重新加载
          }
        });
      });
    },
    getArticle() {
      //获得基本信息
      getArticle().then((res) => {
        // console.log(res)
        this.articleList = res;
      });
    },
    getAllUser() {
      //所有用户
      getAllUser().then((res) => {
        // console.log(res)
        this.allUser = res;
      });

    },

    handleDelete2(index, row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delectUser(index, row).then((res) => {
          if (res.status == 1) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getAllUser(); //重新加载
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.articleList {
  position: relative;
  /* display: flex; */
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
.back {
  padding-top: 20px;
}
.title {
  text-align: center;
}
.btn {
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
}
.add {
  display: flex;
  justify-content: center;
}
.article {
}
.table {
  margin-top: 30px;
  opacity: 0.8;
}
</style>