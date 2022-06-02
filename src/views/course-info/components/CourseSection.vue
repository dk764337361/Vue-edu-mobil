<!--  -->
<template>
  <div class="course-section">
    <h2 class="section" v-text="sectionData.sectionName"></h2>
    <!-- 课时名称 -->
    <p
      class="lesson"
      v-for="item in sectionData.courseLessons"
      :key="item.id"
      @click="handleClick(item)"
    >
      <span v-text="item.theme"></span>
      <van-icon v-if="item.canPlay" name="play-circle" size="20"></van-icon>
      <van-icon v-else name="lock" size="20"></van-icon>
    </p>
  </div>
</template>

<script>
import { Icon } from 'vant'
export default {
  name: 'CourseSection',
  props: {
    sectionData: {
      type: Object,
      required: true
    }
  },
  components: {
    VanIcon: Icon
  },
  data () {
    return {}
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {},
  methods: {
    handleClick (lessonInfo) {
      // 只有当前课程能够播放时，才跳转视频页面，并传递课程Id
      if (lessonInfo.canPlay) {
        this.$router.push({
          name: 'lesson-video',
          params: {
            lessonId: lessonInfo.id
          }
        })
      }
    }
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {}
}
</script>
<style lang="scss" scoped>
.course-section {
  padding: 0 20px;
}
.lesson {
  display: flex;
  justify-content: space-between;
  line-height: 20px;
}
</style>
