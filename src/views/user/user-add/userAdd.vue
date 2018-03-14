<template>
<div>
    <h1>添加用户</h1>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="姓名" prop="name">
            <Input v-model="formValidate.name" placeholder="输入用户名"></Input>
        </FormItem>
        <FormItem label="用户名" prop="username">
            <Input v-model="formValidate.username" placeholder="输入用户名"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
            <Input type="password" v-model="formValidate.password" placeholder="输入密码"></Input>
        </FormItem>
        <FormItem label="部门" prop="dept">
            <Select v-model="formValidate.dept" placeholder="选择部门">
                <Option value="产品部">产品部</Option>
                <Option value="设计部">设计部</Option>
                <Option value="研发部">研发部</Option>
                <Option value="测试部">测试部</Option>
                <Option value="运维部">运维部</Option>
            </Select>
        </FormItem>
        <FormItem label="手机号码" prop="telPhone">
            <Input v-model="formValidate.telPhone" placeholder="输入手机号码"></Input>
        </FormItem>
        <FormItem label="性别" prop="sex">
            <Select v-model="formValidate.sex" placeholder="选择性别">
                <Option value="男">男</Option>
                <Option value="女">女</Option>
            </Select>
        </FormItem>
        <FormItem label="描述" prop="description">
            <Input v-model="formValidate.description" placeholder="输入描述"></Input>
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
        name: "",
        username: "",
        password: "",
        dept: "",
        telPhone: "",
        sex: "",
        description: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur"
          },
          {
            min: 2,
            max: 5,
            message: '长度在 2 到 5 个字符',
            trigger: 'blur'
          }
        ],
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          ,
          {
            min: 5,
            max: 20,
            message: '长度在 5 到 20 个字符',
            trigger: 'blur'
          }
        ],
        dept: [
          {
            required: true,
            message: "部门不能为空",
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
          var name = localStorage.getItem("name");
          var postData = {"name": that.formValidate.name,
            "username": that.formValidate.username,
            "password": that.formValidate.password,
            "dept": that.formValidate.dept,
            "telPhone": that.formValidate.telPhone,
            "sex": that.formValidate.sex,
            "description": that.formValidate.description,
            "crtTime": new Date(),
            "crtName": name,
            "updTime": new Date(),
            "updName": name };
          axios
            .post(config.baseUrl + "/base/user/add", postData)
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