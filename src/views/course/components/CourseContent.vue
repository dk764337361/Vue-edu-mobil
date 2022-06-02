<template>
  <div class="course-content">
    <!-- 顶部⼴告轮播 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in activeAdList" :key="item.id">
        <img :src="item.img" />
      </van-swipe-item>
    </van-swipe>
    <!-- 底部课程列表 -->
    <course-content-list
    :fetch-data="fetchData"
    ></course-content-list>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'
import { getAllAds, getQueryCourses } from '@/services/course'
import CourseContentList from '@/components/CourseContentList'
export default {
  name: 'CourseContent',
  components: {
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
    CourseContentList
  },
  data () {
    return {
      // 轮播图图⽚列表
      adList: []
    }
  },
  created () {
    this.loadAds()
    // 方法二
    // this.fetchData = getQueryCourses
  },
  methods: {
    // 方法一：
    fetchData (option) {
      return getQueryCourses(option)
    },
    async loadAds () {
      const { data } = await getAllAds({
        spaceKeys: '999'
      })
      // console.log(data)
      // 保存⼴告信息
      this.adList = data.content[0].adDTOList
    }
  },
  computed: {
    activeAdList () {
      return this.adList.filter((item) => item.status === 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.my-swipe {
  width: 100%;
}

.my-swipe .van-swipe-item {
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.my-swipe img {
  height: 170px;
}

.course-content-list {
top: 220px;
bottom: 50px;
}
</style>
