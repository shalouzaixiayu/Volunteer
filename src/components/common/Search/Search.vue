<template>
  <div class="search">
    <input
      type="text"
      v-model.lazy="search"
      placeholder="输入并搜索"
      @keyup.enter="isSearch"
    />
  </div>
</template>

<script>
import { searchActiveByTitle } from "../../../network/activeRequest";
export default {
  name: "Search",
  data() {
    return {
      search: "",
      type: "", // 搜索框的类型    active or people  by refs
      obj: null
    };
  },
  methods: {
    changeType(type) {
      this.type = type;
    },
    isSearch() {
      if (this.type === "active" && this.search) {
        searchActiveByTitle(this.search, 50).then((data) => {
          this.obj = data
          this.obj.type = this.type;
          this.$emit('activeSearch', this.obj)
        });
      }
    },
  },
};
</script>
<style scoped>
.search {
  height: 30px;
  text-align: center;
  margin: 30px 0;
}
.search input {
  text-align: center;
  line-height: 30px;
  width: 250px;
  border-radius: 42px;
  border: 1px solid #324b4e;
  cursor: pointer;
  transition: all 0.3s;
}
.search input:focus {
  width: 300px;
}
</style>