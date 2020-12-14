import {
  request
} from './request'
export const checkToken = {
  beforeCreate() {
    let user_name = localStorage.getItem('user_name')
    let token = localStorage.getItem('token')
    let obj = {
      user_name,
      token
    }
    request({
      method: 'post',
      url: '/admin/checkUser',
      data: obj
    }).then(res => {  
      if(res.status == 0) {
        localStorage.clear
        // this.$message('请重新登录')
        this.$router.replace('/home/homeMain')
      }else if(res.status == 1) {
        this.$store.commit("changeIsSignIn", 1)
      }
    })

  },
}
