<template>
  <div class="tabbar-item"  @click="goLink">
    <div :class="{active:isActive}">
      <slot v-if="!isActive" name="itemIco"></slot>
      <slot v-else name="itemIcoActive"></slot>
    </div>
     <div :class="{active:isActive}">
      <slot name="itemText"></slot>
     </div>
  </div>
</template>

<script>
export default {
  name:'TabBarItem',
  props:{
    path:String
  },
  computed: {
    isActive(){
      return this.$route.path == this.path;
    }
  },
  methods:{
    goLink(){
      this.$router.push(this.path)
    }
  }
}
</script>

<style>
.tabbar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  border-right: 1px solid rgba(100, 100, 100, 0.1);
}
.tabbar-item img {
  height: 24px;
  width: 24px;
  margin-top: 4px;
}
.tabbar-item span{
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}
.active{
  color: #f00;
  opacity: 0.6;
}
.active img{
  transition: transform 2s ease;
  transform: scale(1.2, 1.2);
}
</style>