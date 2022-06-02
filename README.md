# edu-boss-fed

## 简介

基础技术栈：Vue2+VueCli+Vuex+VueRouter+Axios+Vant

项目描述：

功能主要：“主页课程列表展示”，“课程详情页”，“课程购买页”，“登陆页”。

基础技术栈：Vue2+VueCli+Vuex+VueRouter+Axios+Vant

项目描述：
1. 页面搭建：使用Vant 移动端组件库，配合后台API。
2. 登陆功能：使用Vuex 和本地存储，配合router的导航守卫跳转，配合后台API。
3. 接口鉴权和刷新Token：使用Axios的请求拦截器做响应拦截器
4. 支付功能：使用订单API获取订单号，调用支付API，查询订单结果
5. 视频播放：使用"阿里云视频点播"服务，查询后端API，查询课程是否被解锁。

<img src="/explanation/070.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## 命令
```sh
# 热更新
npm run serve
# 打包
npm run build
#上传
npm run psuh
