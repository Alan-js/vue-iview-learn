<template>
<div>
    <h1>修改部门</h1>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="部门名称" prop="name">
            <Input v-model="formValidate.name" placeholder="输入部门名称"></Input>
        </FormItem>
        <FormItem label="部门编号" prop="code">
            <Input v-model="formValidate.code" placeholder="输入部门编号"></Input>
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
  name: "departmentUpdate",
  data() {
    return {
      formValidate: {
        name: "",
        code: "",
        description: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "部门名称不能为空",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "部门编号不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    init() {
        var that = this;
        var departmentRow = JSON.parse(localStorage.getItem('departmentRow'));
        that.formValidate.name = departmentRow.name;
        that.formValidate.code = departmentRow.code;
        that.formValidate.description = departmentRow.description;
    },
    handleSubmit(name) {
      var that = this;
      var departmentRow = JSON.parse(localStorage.getItem('departmentRow'));
      that.$refs[name].validate(valid => {
        if (valid) {
          var name = localStorage.getItem("name");
          var postData = {
            "id": departmentRow.id,
            "name": that.formValidate.name,
            "code": that.formValidate.code,
            "description": that.formValidate.description,
            "updTime": new Date(),
            "updName": name };
          axios
            .post(config.baseUrl + "/department/update", postData)
            .then(function(res) {
              if (res.data.code == "200") {
                that.$Message.success("修改成功!");
                that.$router.push({ name: "departmentInfo" });
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
      this.init();
    }
  },
  mounted() {
      this.init();
  }
};
</script>