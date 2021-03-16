<template>
  <div id="slider">
    <!-- 轮播组件 -->
    <div class="slider"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Slider",
  props: {
    animDuration: {
      type: Number,
      default: 300,
    },
    interval: {
      type: Number,
      default: 2000,
    },
    moveRatio: {
      type: Number,
      default: 0.25,
    },
  },
  data() {
    return {
      sliderCount: 0, // 轮播个数
      totalWith: 0, // 图片宽度
      currentIndex: 0, // 当前位置
      scrolling: false, // 是否滚动
      sliderStyle: {}, // 样式
    };
  },
  mounted() {
    setTimeout(() => {
      this.handleDom();
      this.startTimer();
    }, 200);
  },
  methods: {
    startTimer() {
      this.player = setInterval(() => {
        this.currentIndex++;
        this.scrollStart(-this.currentIndex * this.totalWith);
      }, this.interval);
    },
    endTimer() {
      window.clearInterval(this.player);
    },
    handleDom() {
      let slider = document.querySelector(".slider");
      let sliderItem = slider.querySelectorAll(".sitem");

      this.sliderCount = sliderItem.length;
      if (this.sliderCount >= 1) {
        this.totalWith = slider.offsetWidth;
        this.sliderStyle = slider.style;

        let beforeIndex = sliderItem[0].cloneNode(true);
        let lastIndex = sliderItem[this.sliderCount - 1].cloneNode(true);

        slider.appendChild(beforeIndex);
        slider.insertBefore(lastIndex, sliderItem[0]);
      }
      // 跳到第一张图片
      this.setTransform(-this.totalWith);
    },

    scrollStart(currentPosition) {
      this.scrolling = true;
      this.sliderStyle.transition = `transform ${this.animDuration}ms`;
      
      this.setTransform(currentPosition);

      // 检查定位i
      this.checkScrollContent();

      this.scrolling = false;
    },
    setTransform(currentPosition) {
      this.sliderStyle.transform = `translate3d(${currentPosition}px, 0, 0)`;
    },
    checkScrollContent() {
      this.sliderStyle.transition = "0ms";
      setTimeout(() => {
        if (this.currentIndex >= this.sliderCount + 1) {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWith);
        }else if(this.currentIndex <= 0){
          this.currentIndex = this.sliderCount
          this.setTransform(-this.currentIndex * this.totalWith);
         
        }
        // console.log(this.currentIndex)
      }, this.animDuration);
    },
    touchStart(e) {
      if (this.scrolling) return;
      this.endTimer();
      this.startX = e.touches[0].pageX;
    },
    touchMove(e) {
      this.distance = e.touches[0].pageX - this.startX;

      this.currentPosition = -this.currentIndex * this.totalWith;
      this.moveDistance = this.distance + this.currentPosition;
      // console.log(this.moveDistance)
      this.setTransform(this.moveDistance);
    },
    touchEnd() {
      let Abs = Math.abs(this.distance);
      if (this.distance === 0) {
        return;
      } else if (this.distance > 0 && Abs >= this.totalWith * this.moveRatio) {
        this.currentIndex--;
      } else if (this.distance < 0 && Abs >= this.totalWith * this.moveRatio) {
        this.currentIndex++;
      }
      this.scrollStart(-this.currentIndex * this.totalWith);
      this.startTimer();
    },
  },
};
</script>

<style scoped>
#slider {
  position: relative;
  overflow: hidden;
}
.slider {
  display: flex;
}
</style>