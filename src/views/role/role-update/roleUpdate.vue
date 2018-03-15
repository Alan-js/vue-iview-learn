<template>
<div>
    <h1>修改角色</h1>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="角色名称" prop="name">
            <Input v-model="formValidate.name" placeholder="输入角色名称"></Input>
        </FormItem>
        <FormItem label="角色编码" prop="code">
            <Input v-model="formValidate.code" placeholder="输入角色编码"></Input>
        </FormItem>
        <FormItem label="角色类型" prop="type">
            <Input v-model="formValidate.type" placeholder="输入角色类型"></Input>
        </FormItem>
         <FormItem label="角色组类型" prop="groupType">
            <Input v-model="formValidate.groupType" placeholder="输入角色组类型"></Input>
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
  name: "userUpdate",
  data() {
    return {
      formValidate: {
        name: "",
        code: "",
        type: "",
        groupType: "",
        description: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "角色名称不能为空",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "角色编码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    init() {
        var that = this;
        var roleRow = JSON.parse(localStorage.getItem('roleRow'));
        that.formValidate.name = roleRow.name;
        that.formValidate.code = roleRow.code;
        that.formValidate.type = roleRow.type;
        that.formValidate.groupType = roleRow.groupType;
        that.formValidate.description = roleRow.description;
    },
    handleSubmit(name) {
      var that = this;
      var roleRow = JSON.parse(localStorage.getItem('roleRow'));
      that.$refs[name].validate(valid => {
        if (valid) {
          var name = localStorage.getItem("name");
          var postData = {
            "id": roleRow.id,
            "name": that.formValidate.name,
            "code": that.formValidate.code,
            "type": that.formValidate.type,
            "groupType": that.formValidate.groupType,
            "description": that.formValidate.description,
            "updTime": new Date(),
            "updName": name };
          axios
            .post(config.baseUrl + "/role/update", postData)
            .then(function(res) {
              if (res.data.code == "200") {
                that.$Message.success("修改成功!");
                that.$router.push({ name: "roleInfo" });
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