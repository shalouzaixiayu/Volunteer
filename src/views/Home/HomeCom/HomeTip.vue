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
    <span class="why1" @click="showMore(3)">做志愿可以收获什么 ? </span>
    <div v-show="isShow3">
      <p>
        奉献社会。志愿者通过参与志愿工作,有机会为社会出力,尽一份公民责任和义务。
        提供学习的机会。志愿者在参与志愿工作过程中,除了可以帮助人以外,更可培养自己的组织及领导能力。学习新知识、增强自信心及学会与人...
      </p>
      <p>
        丰富生活体验。志愿者利用闲余时间,参与一些有意义的工作和活动,既可扩大自己的生活圈子,更可亲身体验社会的人和事,加深对社会的认识,这对志愿者自身的成长和提高是十分有益的......
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
      isShow3: false,
    };
  },
  methods: {
    showMore(index) {
      if (index === 1) {
        this.isShow1 = !this.isShow1;
      } else if (index === 2) {
        this.isShow2 = !this.isShow2;
      } else if (index === 3) {
        this.isShow3 = !this.isShow3;
      }
    },
  },
};
</script>

<style scoped>
.why {
  width: 80%;
  /* color: rgba(219, 38, 31); */
  margin: 10px 20px;
  border-bottom: 2px solid rgba(219, 38, 31);
  border-left: 2px solid rgba(219, 38, 31);
}
.why1 {
  display: block;
  font-size: 16px;
  padding: 20px;
  line-height: 16px;
  cursor: pointer;
}
.why1::before {
  content: "😊     ";
}
.why p {
  text-indent: 32px;
  line-height: 30px;
  margin: 10px 5px;
  text-align: center;
}
</style>