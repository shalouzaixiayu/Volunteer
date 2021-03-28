<template>
  <div>
    <div class="item" @click="goToActiveDetail">
      <h3>{{ item.title }}</h3>
      <div class="content">
        <img :src="item.image[0] || defaultImg" />
        <p>{{ item.content[0] }}</p>
      </div>
      <footer>
        <span class="sponsor">{{ item.sponsor }}</span>
        <span class="timer">{{ item.timer }}</span>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActiveItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    defaultImg() {
      return require("../../../assets/img/defaultImg.jpg");
    },
  },
  methods: {
    goToActiveDetail() {
      this.$router.push({
        name: "ActiveDetail",
        query: {
          id: this.item.id,
        },
      });
    },
  },
};
</script>

<style scoped>
.item {
  padding: 10px;
  color: #a90000;
  height: 130px;
  width: 100%;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}
.item h3 {
  display: inline-block;
  font-size: 18px;
  padding-bottom: 6px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.content {
  margin: 7px 5px;
  position: relative;
  height: 80px;
}
.content img {
  height: 95px;
  width: 128px;
  border-radius: 12px;
  float: left;
}
.content p {
  font-size: 13px;
  position: relative;
  line-height: 16px;
  max-height: 80px;
  padding: 0 15px;
  opacity: 0.6;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
}
.item footer {
  font-size: 12px;
  transform: translateX(8px);
}
.item footer span.timer {
  margin-left: 5px;
}
</style>