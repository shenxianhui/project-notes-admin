<!-- 组件-实例 -->
<template>
  <div class="hello-world">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'hello-world',
  props: {
    msg: String
  }
};
</script>
