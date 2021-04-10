<template>
  <div :class="$style.icon"></div>
</template>

<script>
export default {};
</script>

<style lang="scss" module>
.icon {
  color: #5a52ff;
  position: relative;
  margin-top: 2px;
  width: 12px;
  height: 12px;
  border: solid 2px currentColor;
  border-radius: 100%;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.icon:before {
  content: "";
  position: absolute;
  top: 12px;
  left: 5px;
  height: 10px;
  width: 3px;
  background-color: currentColor;
}
</style>
