<template>
  <div :class="$style.loading"></div>
</template>

<script>
export default {};
</script>

<style lang="scss" module>
@import "@/assets/styles/mixin.scss";
$colour: rgb(37, 27, 227);
.loading {
  border: 20px solid #f4f2f2fa;
  border-top: 20px solid $colour;
  border-right: 20px solid $colour;
  border-bottom: 20px solid $colour;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  animation: fullSpin 1.5s linear infinite;
  position: relative;
}
</style>
