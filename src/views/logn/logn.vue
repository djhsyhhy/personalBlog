<template>
  <div class="logn">
    <div class="fromitem" v-if="status == 1">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        class="input"
        :rules="rules"
      >
        <el-form-item label="账号" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div class="sign">
        <div><el-button @click="signIn">Sign In</el-button></div>
      </div>
      <p class="toSignUp">
        New to Taoland ?
        <span @click="toSignUp" class="sing-up"> Sign Up !</span>
      </p>
    </div>
    <div class="fromitem" v-else-if="status == 2">
      <el-form ref="form" :model="formUp" label-width="80px" :rules="rules">
        <el-form-item label="账号" prop="name">
          <el-input v-model="formUp.name"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="formUp.nickName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formUp.password"></el-input>
        </el-form-item>
      </el-form>
      <div class="sign">
        <div><el-button @click="signUp" class="sign">Sign Up</el-button></div>
      </div>
      <p class="toSignUp">In ? <span @click="back"> back</span></p>
    </div>
    <div v-else-if="status == 3" class="loading">
      <div v-if="!txtSignIn" class="outside"></div>
      <p v-else class="txt">Sign In</p>
    </div>
  </div>
</template>

<script>
import { register, tourists } from "../../netwoak/logn";
import { getNowDate } from "../../common/public";
export default {
  //这里直接验证token
  mounted() {
    this.form.name = localStorage.getItem('user_name')
  },
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
      formUp: {
        name: "",
        password: "",
        nickName: "",
      },
      status: 1,
      txtSignIn: false,
      rules: {
        name: [
          {
            required: true,
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "长度在 5 到 10 个字符",
            trigger: "blur",
          },
        ],
        nickName: [
          {
            required: true,
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    toSignUp() {
      this.status = 2;
    },
    signIn() {
      //登录
      if (!this.form.name) {
        this.$message("请输入账号");
        return;
      }
      if (!this.form.password) {
        this.$message("请输入密码");
        return;
      }
      this.register(this.form.name, this.form.password)
    },
    register(name, password) {
      register(name, password).then((res) => {
        // console.log(res);
        if (res.status == 1) {
          this.status = 3;

          localStorage.setItem("token", res.token);
          localStorage.setItem("user_name", res.user_name);
          localStorage.setItem("nickName", res.nickName);
          localStorage.setItem("avatar", res.avatar);
          if (res.type == 1) {
            this.$router.push("/articleList"); //作者
          } else {
            this.$confirm("登录成功，请选择", {
              //游客的选择
              cancelButtonText: "修改资料",
              confirmButtonText: "回到首页",
              type: "warning",
            })
              .then(() => {
                this.$router.push("/home/homeMain");
              })
              .catch((action) => {
                this.$router.push("/tourist");
              });
          }
        } else {
          this.$message({
            type: "error",
            message: res.msg,
          });
        }
      });
    },
    back() {
      this.status = 1;
    },
    signUp() {
      //注册
      if (!this.formUp.name) {
        this.$message("请输入账号");
        return;
      }
      if (!this.formUp.password) {
        this.$message("请输入密码");
        return;
      }
      if (!this.formUp.nickName) {
        this.$message("请输入名称");
        return;
      }
      let obj = this.formUp;
      obj.date = getNowDate();
      tourists(obj).then((res) => {
        console.log(res);
        if (res.status == 0) {
          //注册失败
          this.$message(res.msg);
        } else {
          this.$message(res.msg); //注册成功直接登录
          //
          this.register(this.formUp.name, this.formUp.password)
          //
        }
      });
    },
  },
  created() {},
};
</script>

<style>
.logn {
  width: 100%;
  height: 100vh;
  background: url("../../assets//img/blogBackImg.jpg");
}
.fromitem {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 30%;
  transform: translate(-50%, -50%);
}
.input {
}
.sign {
  display: flex;
  justify-content: center;
}
.toSignUp {
  margin-top: 10px;
  text-align: center;
}
.sing-up {
  color: rgb(233, 125, 125);
}
.sing-up :hover {
  cursor: pointer;
}
</style>