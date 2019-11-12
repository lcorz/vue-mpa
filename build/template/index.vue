<template>
  <div class="index">
    <h1>LIST</h1>
    <a v-for="(item, index) in list" :key="index" :href="`/${item}.html`">{{item}}.html</a>
  </div>
</template>

<script>

export default {
  name: 'index',
  data() {
    return {
      list: %LIST%
    }
  },
}
</script>

<style lang="less" scoped>
@charset "UTF-8";
.index{
  padding: 50px;
  h1{
    margin-bottom: 20px;
  }
  a{
    display: block;
    direction: none;
    font-size: 21px;
    line-height: 1.4;
    color: #333;
    transition: 0.2s all;
  }
  a:hover{
    color: #eb5055;
  }
}
</style>