<template>
  <div ref="toastcontainer" class="toastcontainer" v-show="$store.state.isShow" @click="toastOut">
    <div class="toast" @click="a">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:"BigToast",
  methods: {
    toastOut(e) {
      if(e.target !== this.$refs.toastcontainer) {
        return
      }
      this.$store.commit('changeToastStatus')
    }
  }
}
</script>

<style scoped>
.toastcontainer{
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 93vh;
    background-color: rgba(0, 0, 0, .3);
  }
  .toastcontainer .toast{
    width: 80%;
    max-height: 400px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 18%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 15px #ccc;
    padding: 20px;
    box-sizing: border-box;
  }
</style>