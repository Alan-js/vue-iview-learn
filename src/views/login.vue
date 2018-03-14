<style lang="less">
@import "./login.less";
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="username">
                            <Input v-model="form.username" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from "js-cookie";
import axios from "axios";
import config from "../../build/config";
export default {
  data() {
    return {
      form: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit() {
      var that = this;
      that.$refs.loginForm.validate(valid => {
        if (valid) {
          var postData = {
            username: that.form.username,
            password: that.form.password
          };
          axios
            .post(config.baseUrl + "/base/user/login", postData)
            .then(function(res) {
              // console.log(res);
              if (res.data.code == "200") {
                Cookies.set("user", that.form.username);
                localStorage.setItem("username", res.data.data[0].username);
                localStorage.setItem("name", res.data.data[0].name);
                localStorage.setItem("updHost", res.data.data[0].updHost);
                that.$router.push({
                  name: "home_index"
                });
              } else {
                that.$Message.warning(res.data.message);
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        }
      });
    }
  },

  mounted() {}
};
</script>

<style>

</style>
