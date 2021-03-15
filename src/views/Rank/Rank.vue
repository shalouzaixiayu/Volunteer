<template>
  <div>
    <!-- 顶部导航栏 -->
    <nav-bar>
      <template #center>志愿者排名</template>
    </nav-bar>
    <div class="container">
      <!-- 前三名 -->
      <rank-head :list="sList"></rank-head>
      <!-- 四名之后 -->
      <div class="main">
        <template v-for="(item, i) in sList" :key="item.id">
          <rank-item
            :obj="item"
            :i="i"
            v-if="i > 2"
          ></rank-item>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { requestAllPeople } from "../../network/peopleRequest.js";
import RankHead from "./RankHeader.vue";
import RankItem from "./RankItem.vue";
import NavBar from "../../components/common/Navbar/NavBar.vue";
export default {
  components: { RankItem, RankHead, NavBar },
  name: "Rank",
  data() {
    return {
      sList: [],
      imgList: [
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1475169296,1277034405&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1531131778,2524913106&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2551985090,2793423744&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2592144766,1647119108&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2985396230,2457625401&fm=26&gp=0.jpg',
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2858934627,3429261099&fm=26&gp=0.jpg'
      ],
    };
  },
  methods: {
    // 排名方法
    listSort(arr) {
      arr.sort(function (a, b) {
        return b.point - a.point;
      })
    },



    // 给前五个学生添加头像
    addImgAds(arr) {
      let i = 0
      arr.forEach(item => {
        if(item.headImg) {
          return
        }
        item.headImg = this.imgList[i++]
      })
      return arr
    }
  },
  created() {
    // bindTypeAndGet(this.$findType.image, 11110, "你好啊")
    // 请求所有对象
    requestAllPeople().then(res => {
      const {data} = res
      this.addImgAds(data)
      this.sList = data
      this.listSort(this.sList);
    })
  },
};
</script>

<style scoped>
.container {
  padding-bottom: 50px;
  height: 85vh;
  display: flex;
  flex-direction: column;
}
.container .main {
  flex: 1;
  overflow: auto;
}
</style>