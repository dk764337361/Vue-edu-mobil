<template>
  <div class="course-info">
      <!-- 如果已购，去除底部⽀付区域并设置主体内容区域占满屏幕 -->
    <van-cell-group :style="styleOption">
      <!-- 课程图⽚ -->
      <van-cell class="course-img">
        <img :src="course.courseImgUrl" alt="" />
      </van-cell>
      <!-- 课程描述 -->
      <van-cell class="course-desctription">
        <!-- 课程名称 -->
        <h2 v-text="course.courseName"></h2>
        <!-- 课程概述 -->
        <p v-text="course.previewFirstField"></p>
        <!-- 课程销售信息 -->
        <div class="course-sale-info">
          <p class="course-price">
            <span class="discounts">￥{{ course.discounts }}</span>
            <span>￥ {{ course.price }}</span>
          </p>
          <span class="tag">{{ course.sales }}人已购</span>
          <span class="tag">每周三、五更新</span>
        </div>
      </van-cell>
      <!-- 课程详细内容 -->
      <van-cell class="course-detail">
        <!-- 选项卡 -->
        <van-tabs sticky scrollspy>
          <van-tab title="详情">
            <!-- 课程详情在后台是通过富文本编辑器设置的，内容为HTML文本 -->
            <div v-html="course.courseDescription"></div>
          </van-tab>
          <van-tab title="内容">
            <course-section
              v-for="item in sections"
              :key="item.id"
              :section-data="item"
            />
          </van-tab>
        </van-tabs>
      </van-cell>
    </van-cell-group>
    <!-- 底部支付功能 -->
    <van-tabbar v-if="!course.isBuy">
      <div class="price">
        <span v-text="course.discountsTag"></span>
        <span class="discounts">￥{{ course.discounts }}</span>
        <span>￥{{ course.price }}</span>
      </div>
      <van-button
      @click="handlePay"
      type="primary">立即购买</van-button>
    </van-tabbar>
  </div>
</template>

<script>
import { CellGroup, Tabs, Tab, Cell } from 'vant'
import CourseSection from './components/CourseSection.vue'
import { getCourseById, getSectionAndLesson } from '@/services/course'
export default {
  name: 'CourseInfo',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    VanCellGroup: CellGroup,
    VanTabs: Tabs,
    VanTab: Tab,
    VanCell: Cell,
    CourseSection
  },
  data () {
    return {
      // 课程信息
      course: {},
      sections: {},
      // 样式信息
      styleOption: {}
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {
    this.loadCourse()
    this.loadSections()
  },
  methods: {
    handlePay () {
      // 检测是否登录
      if (this.$store.state.user) {
        // 如果已登录，跳转支付页
        this.$router.push({
          name: 'pay',
          params: {
            courseId: this.courseId
          }
        })
      } else {
        this.$router.push({
          name: 'login',
          query: {
            redirect: this.$route.fullPath
          }
        })
      }
    },
    async loadSections () {
      const { data } = await getSectionAndLesson({
        courseId: this.courseId
      })
      console.log(data)
      this.sections = data.content.courseSectionList
    },
    async loadCourse () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      this.course = data.content
      //   console.log(data)
      if (data.content.isBuy) {
        this.styleOptions.bottom = 0
      }
    }
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {}
}
</script>
<style lang="scss" scoped>
// 课程图片区域
.van-cell {
  padding: 0;
}
.course-img {
  height: 280px;
}

// 课程描述区域
.course-desctription {
  padding: 10px 20px;
  height: 150px;
}
.course-desctription h2 {
  padding: 0;
}
.course-sale-info {
  display: flex;
}
.course-sale-info .course-price {
  flex: 1;
  margin: 0;
}
.discounts {
  color: #ff7452;
  font-size: 24px !important;
  font-weight: 700;
}
.course-sale-info .tag {
  background-color: #f8f9fa;
  font-size: 12px;
  font-weight: 700;
  color: #666;
  margin-left: 10px;
  padding: 7px;
  line-height: 15px;
  border-radius: 3px;
}
// 添加底部导航后设置
.van-cell-group {
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 50px;
  overflow-y: auto;
}

.van-tabbar {
  line-height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price span {
  font-size: 14px;
}

.van-button {
  width: 40%;
  height: 80%;
}
</style>
