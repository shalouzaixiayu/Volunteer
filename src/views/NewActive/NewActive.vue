<template>
  <div id="newActive">
      上传图片<input type="file" @change="handleFile" multiple/>
  </div>
</template>

<script>
import { uploadImage } from "../../network/newRequest";
export default {
  name: "NewActive",
  data() {
    return {
      files: "",
    };
  },
  methods: {
    handleFile(e) {
      const files = e.target.files;
      const formData = new FormData();

      // 单个加入
      // formData.append("image", files[0]);
      // formData.append("image", files[1]);

      // 遍历加入
      for (const file of files) {
        formData.append("image", file)
      }
      uploadImage(formData);
      // console.log(formData.getAll('image'))
    },
  },
};
</script>

<style>
</style>