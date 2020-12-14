<template>
  <div class="page">
    <div class="wrapper">
      <div class="content">
        <el-row class="row">
          <el-col :xs="4" :sm="6" :md="6" :lg="6" :xl="6">
            <p class="label">昵称：</p>
          </el-col>
          <el-col :xs="20" :sm="18" :md="18" :lg="18" :xl="18">
            <el-input
              class="input"
              v-model="nickName"
              placeholder="请输入昵称"
            ></el-input>
          </el-col>
        </el-row>

        <!-- <el-upload
          class="avatar-uploader"
          action="http://localhost:8888/api/upImg" 
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> -->

        <el-row class="row">
          <el-col :xs="4" :sm="6" :md="6" :lg="6" :xl="6">
            <p class="label">头像：</p>
          </el-col>
          <el-col :xs="20" :sm="18" :md="18" :lg="18" :xl="18">
            <label for="upLoad">
              <img
                :src="avatar != 'null' ? avatar : imgDefault"
                alt=""
                class="avatar"
              />
            </label>

            <input @change="upLoad" id="upLoad" type="file" />

            <p class="tips">tips:请上传2M以内JPG/PNG格式的图片，比例最好1:1</p>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col
            class="bar"
            :offset="6"
            :xs="18"
            :sm="18"
            :md="18"
            :lg="18"
            :xl="18"
          >
            <el-button @click="save" type="primary">Save</el-button>
            <el-button @click="signOut">Sign Out</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { imgTo64 } from "../../common/public";
import { checkToken } from "../../netwoak/token";
import { upLoadImg } from "../../netwoak/demo";
import imgDefault from "../../assets//img/tou.png";

export default {
  name: "Tourist",
  mixins: [checkToken],
  data() {
    return {
      nickName: null,
      avatar: null,
      name: null,
      token: null,
      imgDefault: imgDefault,
      imageUrl: "",
    };
  },
  created() {
    this.nickName = localStorage.getItem("nickName");
    this.avatar = localStorage.getItem("avatar");
    this.name = localStorage.getItem("user_name");
    this.token = localStorage.getItem("token");
  },
  methods: {
    upLoad: function (e) {
      //上传头像
      let that = this; //保存this
      let files = e.target.files || e.dataTransfer.files;

      if (!files.length) return;
      if (
        files[0].type.indexOf("png") > -1 ||
        files[0].type.indexOf("jpg") > -1 ||
        files[0].type.indexOf("jpeg") > -1
      ) {
        if (files[0].size < 2000000) {
          if (typeof FileReader === "undefined") {
            alert("您的浏览器不支持图片上传，请升级您的浏览器");
          }
          let reader = new FileReader();
          reader.readAsDataURL(files[0]);
          reader.onload = function (e) {
            let image = new Image();
            image.src = e.target.result; //原始base64
            image.setAttribute("crossOrigin", "anonymous"); //允许图片跨域请求、必须后台也允许
            image.onload = () => {
              let base64 = imgTo64(image); //使用cavas压缩
              that.avatar = base64;
            };
          };
        } else {
          alert("请上传2M以内的图片");
        }
      } else {
        alert("请上传JPG/PNG格式的图片");
      }
    },
    save: function () {
      //保存
      let obj = {
        name: this.name,
        token: this.token,
        nickName: this.nickName,
        avatar: this.avatar,
      };
      upLoadImg(obj)
        .then((res) => {
          if (res.status == 1) {
            localStorage.setItem("nickName", res.nickName);
            localStorage.setItem("avatar", res.avatar);
          }
          this.$message('已成功')
          this.$router.replace('/home/homeMain')
        })

    },

    signOut: function () {
      //退出
      let that = this;
      that.$axios
        .post(webUrl + "admin/signOut", {
          name: that.name,
          token: that.token,
        })
        .then((response) => {
          alert(response.data.msg);
          if (response.data.status == 1) {
            this.$store.commit("changeIsSignIn", 0);
            this.$store.commit("changeIndex", "1");
            localStorage.clear();
            this.$router.replace({ name: "home" });
          }
        })
        .catch((reject) => {
          console.log(reject);
        });
    },

    // handleAvatarSuccess(res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw);
    // },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === "image/jpeg";
    //   const isLt2M = file.size / 1024 / 1024 < 2;

    //   if (!isJPG) {
    //     this.$message.error("上传头像图片只能是 JPG 格式!");
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 2MB!");
    //   }
    //   return isJPG && isLt2M;
    // },
  },
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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

.page {
  width: 75%;
  margin: 0 auto;
}
.row {
  margin: 20px 0 20px 0;
}
.input {
  width: 150px;
}
.label {
  text-align: right;
  line-height: 40px;
}
.tips {
  font-weight: 80;
  font-size: 10px;
  margin-top: 5px;
  color: rgb(163, 162, 162);
  text-align: center;
}
</style>