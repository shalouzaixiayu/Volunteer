<template>
  <div class="why">
    <span class="why1" @click="showMore(1)">什么是志愿者 ? </span>
    <div v-show="isShow1">
      <p>
        志愿者（Volunteer）联合国定义为“自愿进行社会公共利益服务而不获取任何利益、金钱、名利的活动者”，
        具体指在不为任何物质报酬的情况下，能够主动承担社会责任而不获取报酬，奉献个人时间和助人为乐行动的人。
      </p>
      <p>
        在自身条件许可的情况下，参加相关团体，在不谋求任何物质、金钱及相关利益回报的前提下，在非本职职责范围内，合理运用社会现有的资源，服务于社会公益事业，为帮助有一定需要的人士，
        开展力所能及的、切合实际的，具一定专业性、技能性、长期性服务活动的人......
      </p>
    </div>
    <span class="why1" @click="showMore(2)">为什么加入志愿者 ? </span>
    <div v-show="isShow2">
      <p>
        加入志愿者会让我们很平凡，却很幸运；令我们很辛苦，但也很快乐。
        同时也是我们沟通的彩虹，是交流的桥梁，我们用生命影响生命，我们是快乐的志愿者。
      </p>
      <p>
        加入志愿者可以利用闲余时间，让自己能够参与一些有意义的工作和活动，既可扩大自己的生活圈子，更可亲身体验社会的人和事，
        加深对社会的认识，这对自身的成长和提高是十分有益的......
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeTip",
  data() {
    return {
      isShow1: false,
      isShow2: false,
    };
  },
  methods: {
    showMore(index) {
      if (index === 1) {
        this.isShow1 = !this.isShow1;
      } else if (index === 2) {
        this.isShow2 = !this.isShow2;
      }
    },
  },
};
</script>

<style scoped>
.why {
  /* border-top: solid 1px rgb(102, 102, 102);
  border-bottom: solid 1px rgb(102, 102, 102); */
  width: 80%;
  /* background-color: rgba(255, 255, 255, 0.7); */
  /* background-color: rgba(246, 230, 230, 1); */
   background: hsla(0,0%,100%,.25) border-box;
  color: rgba(102, 102, 102, 0.85);
  margin: 10px auto;
  padding: 20px;
}
.why .why1 {
  display: block;
  font-size: 18px;
  font-family: "宋体";
  font-weight: 550;
  margin: 20px 0;
}
.why p {
  font-size: 14px;
  line-height: 18px;
  padding: 10px;
  text-indent: 20px;
  cursor: pointer;
}
.why div {
  transition: all 0.6s ease;
}
</style>