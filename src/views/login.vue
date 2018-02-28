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
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
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
        userName: "admin",
        password: "123456"
      },
      rules: {
        userName: [
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
          axios
            .get(
              config.baseUrl +
                "/user/login?userName=" +
                that.form.userName +
                "&password=" +
                that.form.password
            )
            .then(function(res) {
              console.log(res);
              if (res.data.code == "200") {
                Cookies.set("user", that.form.userName);
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
