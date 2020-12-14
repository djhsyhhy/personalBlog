<template>
  <div class="main">
    <About v-for="(item, index) in allValue" :key="index" :value="item" />
  </div>
</template>

<script>
import About from "../../components/common/about/about";
export default {
   components: {
    About,
  },
  data() {
    return {
      allValue: [
        {
          title: "关于我",
          content: [
            "我叫邵毅涵",
            "今年20了，喜欢学习，喜欢思考，Write the Code. Change the World.",
            `今年大三了，接触前端快一年了，一个人摸索学习，磕磕绊绊不断地学习进步。
            相信可以通过自己的努力让未来变得更美好。（希望爱我的人和我爱的人都过的幸福）`,
          ],
        },
        {
          title: "关于本站",
          content: [
            `本站的出现是因为个人打算在掘金上写文章来增加自己的技术积累，别人的建议
            自己写一个博客，既然学了那么长时间就没有使用框架`,
            `一开始查阅了资料准备了几天，最后经过别人的指导从服务器后台开始做起，一步一步的
            搭了起来`,
            `也是对自己的一种挑战，希望可以学到更多，搭建过程中，遇到了不少的坑
            和bug，学习到了很多，希望这个博客可以给我带来更多的技术积累`,
            `现在还有很多功能没有实现，样式也很丑，主要是自己的css太菜了（哈哈）
            等等在进行规划`
          ],
          
        },
        {
          title: "技术栈",
          content: [
            `前端： vue + element`,
            `后台： vue + element`,
            `服务器： node + mongodb + express`,
          ],
          
        },
        {
          title: "联系方式",
          content: [
            `QQ：529153492`,
            `微信： 13043039448`,
            `共同交流，共同学习进步`,
          ],
          
        },
        {
          title: "给自己的话",
          content: [
            `希望自己可以不断保持热情，不断学习，不断的进步`,
            `为了未来和她有一个好的未来，我会努力的（风雨向我开炮吧）`,
            `希望活成自己的样子`,
          ],
          
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>