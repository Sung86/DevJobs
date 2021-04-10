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
  border: 40px solid #f4f2f2fa;
  border-top: 40px solid $colour;
  border-right: 40px solid $colour;
  border-bottom: 40px solid $colour;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  animation: fullSpin 1.5s linear infinite;
  position: relative;
}
</style>
