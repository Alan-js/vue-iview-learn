<template>
<div>
    <h1>添加用户</h1>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="用户名" prop="userName">
            <Input v-model="formValidate.userName" placeholder="输入用户名"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
            <Input type="password" v-model="formValidate.password" placeholder="输入密码"></Input>
        </FormItem>
        <FormItem label="昵称" prop="nickName">
            <Input v-model="formValidate.nickName" placeholder="输入昵称"></Input>
        </FormItem>
        <FormItem label="性别" prop="sex">
            <Select v-model="formValidate.sex" placeholder="选择性别">
                <Option value="1">男</Option>
                <Option value="0">女</Option>
            </Select>
        </FormItem>
        <FormItem label="注册日期" prop="registerDate">
          <FormItem prop="registerDate">
              <DatePicker type="date" v-model="formValidate.registerDate" placeholder="选择注册日期"></DatePicker>
          </FormItem>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
    </div>
</template>
<script>
import axios from "axios";
import config from "../../../../build/config";
export default {
  name: "userAdd",
  data() {
    return {
      formValidate: {
        userName: "",
        password: "",
        nickName: "",
        sex: "",
        registerDate: ""
      },
      ruleValidate: {
        userName: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ],
        nickName: [
          {
            required: true,
            message: "昵称不能为空",
            trigger: "blur"
          }
        ],
        sex: [
          {
            required: true,
            message: "性别不能为空",
            trigger: "change"
          }
        ],
        registerDate: [
          {
            required: true,
            type: "date",
            message: "注册日期不能为空",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      var that = this;
      that.$refs[name].validate(valid => {
        if (valid) {
          var param = new URLSearchParams();
          param.append("username", that.formValidate.userName);
          param.append("password", that.formValidate.password);
          param.append("nickName", that.formValidate.nickName);
          param.append("sex", that.formValidate.sex);
          param.append("registerDate", that.formValidate.registerDate);
          axios
            .post(config.baseUrl + "/user/add", param)
            .then(function(res) {
              if (res.data.code == "200") {
                that.$Message.success("添加成功!");
                that.$router.push({ name: "userInfo" });
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        } else {
          that.$Message.error("请检查输入信息!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>