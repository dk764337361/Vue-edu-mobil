<!--  -->
<template>
  <div class="learn">
    <!-- 顶部功能 -->
    <van-nav-bar title="已购课程" />
    <!-- 课程列表 -->
    <course-content-list
    :fetch-data="fetchData"
    ></course-content-list>
    <!-- 底部导航 -->
    <layout-footer></layout-footer>
</div>
</template>

<script>
import { NavBar } from 'vant'
import LayoutFooter from '@/components/LayoutFooter.vue'
import CourseContentList from '@/components/CourseContentList'
import { getPurchaseCourse } from '@/services/course'

export default {
  name: 'LearnIndex',
  props: {

  },
  components: {
    VanNavBar: NavBar,
    LayoutFooter,
    CourseContentList
  },
  data () {
    return {

    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {
    // this.loadCourse()
  },
  methods: {
    // async loadCourse () {
    //   const { data } = await getPurchaseCourse()
    //   console.log(data)
    // }
    fetchData () {
      return getPurchaseCourse()
    }
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
.course-content-list{
  top: 50px;
  bottom:50px
}

</style>
