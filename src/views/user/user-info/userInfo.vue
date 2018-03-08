<template>
    <div>
        <Row>
          <Col span="20">
            <h1>用户信息</h1>
          </Col>
          <Col span="4" style="font-size:30px">
            <Tooltip content="添加用户">
              <Icon type="plus" @click.native="goUserAdd()"></Icon>
            </Tooltip>
            
          </Col>
        </Row>
        <Table border height="600" :columns="columnsList" :data="dataList"></Table>
        <p style="margin:5px 0"><Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total   
placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>  </p>
        
    </div>
</template>

<script>
import axios from "axios";
import util from "../../../libs/util";
import config from "../../../../build/config";
export default {
  name: "userInfo",
  data() {
    return {
      dataList: [],
      pageTotal: 0,
      pageNum: 1,
      pageSize: 10,
      columnsList: [
        {
          title: "序号",
          key: "",
          render: (h, params) => {
            return h("span", params.index + 1);
          }
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "用户名",
          key: "username"
        },
        {
          title: "性别",
          key: "sex",
          filters: [
            {
              label: "男",
              value: "男"
            },
            {
              label: "女",
              value: "女"
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === "男") {
              return row.sex == "男";
            } else if (value === "女") {
              return row.sex == "女";
            }
          }
        },
         {
          title: "描述",
          key: "description"
        },
        {
          title: "创建时间",
          key: "crtTime",
          render: (h, params) => {
            return h(
              "div",
              new Date(params.row.crtTime).Format("yyyy-MM-dd hh:mm:ss")
            );
          }
        },
        {
          title: "更新时间",
          key: "updTime",
          render: (h, params) => {
            return h(
              "div",
              new Date(params.row.updTime).Format("yyyy-MM-dd hh:mm:ss")
            );
          }
        },
        {
          title: "最后更新人",
          key: "updName"
        },
        {
          title: "操作",
          key: "",
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  class: "ivu-btn-primary",
                  style: { "margin-right": "5px" },
                  on: {
                    click: () =>{
                      var argu = { userId: params.row.id,userRow: params.row };
                      this.$router.push({
                          name: 'userUpdate',
                          params: argu
                      });
                      localStorage.userRow = JSON.stringify(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title: "您确定要删除这条数据吗?",
                    transfer: true
                  },
                  on: {
                    "on-ok": () => {
                      axios
                        .post(
                          config.baseUrl + "/base/user/delete?id=" + params.row.id
                        )
                        .then(function(res) {
                          if (res.data.code == "200") {
                            window.location.reload();
                          }
                        })
                        .catch(function(err) {
                          console.log(err);
                        });
                    }
                  }
                },
                [
                  h(
                    "Button",
                    {
                      style: { margin: "0 5px" },
                      props: {
                        type: "error",
                        placement: "top"
                      }
                    },
                    "删除"
                  )
                ]
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    getList() {
      var that = this;
      axios
        .get(config.baseUrl + "/base/user/list?page="+that.pageNum+"&size="+that.pageSize)
        .then(function(res) {
          // console.log(res.data.data);
          that.dataList = res.data.data.list;
          that.pageTotal = res.data.data.total;
          that.pageNum = res.data.data.pageNum;
          that.pageSize = res.data.data.pageSize;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    handlePage(value) {
      this.pageNum = value;
      this.getList();
    },
    handlePageSize(value) {
      this.pageSize = value;
      this.getList();
    },
    goUserAdd() {
      this.$router.push({ name: "userAdd" });
    },
    initFormat() {
      Date.prototype.Format = function(fmt) {
        let o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
        return fmt;
      };
    }
  },
  mounted() {
    this.getList();
    this.initFormat();
  }
};
</script>
