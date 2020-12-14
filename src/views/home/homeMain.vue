<template>
  <div class="homeMain">
    <el-row :gutter="30">
      <el-col
        :sm="24"
        :md="16"
        style="transition: all 0.5s ease-out; margin-bottom: 30px"
      >
        <ArticleItem
          v-for="(item, index) in articleList"
          :key="index"
          :item="item"
        />
      </el-col>
      <el-col :sm="24" :md="8">
        <RightAbout />
      </el-col>
    </el-row>
    <!-- <div class="left">
      <ArticleItem   v-for="(item, index) in articleList" :key="index" 
      :item='item' />
    </div>
    <div class="right">
      <RightAbout />
    </div> -->
  </div>
</template>

<script>
import ArticleItem from "../../components/common/articleItem/articleItem";
import RightAbout from "../../components/common/rightAbout/rightAbout";
import { getArticle } from "../../netwoak//demo";
export default {
  components: {
    ArticleItem,
    RightAbout,
  },
  data() {
    return {
      articleList: [],
    };
  },
  methods: {
    getArticle() {
      getArticle().then((res) => {
        // console.log('11')
        this.articleList = res;
      });
    },
  },
  created() {
    this.getArticle();
  },
};
</script>

<style scoped>
.homeMain {
  display: flex;
  justify-content: center;
  background: #ccc2c2;
}
</style>