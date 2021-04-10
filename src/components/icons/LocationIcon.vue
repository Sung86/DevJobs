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
  width: 13px;
  height: 13px;
  border: solid 1px currentColor;
  border-radius: 7px 7px 7px 0;
  background-color: currentColor;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.icon:before {
  content: "";
  position: absolute;
  left: 3px;
  top: 3px;
  width: 5px;
  height: 5px;
  color: white;
  border: solid 1px currentColor;
  border-radius: 3px;
  background-color: currentColor;
}
</style>
