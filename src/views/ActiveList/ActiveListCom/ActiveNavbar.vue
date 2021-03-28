<template>
  <div>
    <!-- 导航 -->
    <nav-bar>
      <template #left>
        <span class="lt" @click="goback">&lt;</span>
      </template>
      <template #center>
        <span>{{ msg }}</span>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../../components/common/Navbar/NavBar.vue";
export default {
  name: "ActiveNavbar",
  components: {
    NavBar,
  },
  computed: {
    msg() {
      return this.$route.meta.title;
    },
  },
  methods: {
    goback() {
      this.$emit("goBack2Before");
    },
  },
};
</script>

<style scoped>
.lt {
  font-size: 30px;
  font-weight: 300;
  margin-left: -25px;
  cursor: pointer;
}
</style>