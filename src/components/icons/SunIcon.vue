<template>
  <div :class="$style.icon" :style="styleVars"></div>
</template>
<script>
export default {
  props: ["color", "marginLeft", "marginTop"],
  computed: {
    styleVars() {
      return {
        color: this.color,
        "margin-left": this.marginLeft,
        "margin-top": this.marginTop,
      };
    },
  },
};
</script>
<style lang="scss" module>
$color: color;
$marginLeft: margin-left;
$marginTop: margin-right;
.icon {
  color: $color;
  position: absolute;
  margin-left: $marginLeft;
  margin-top: $marginTop;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: 1px solid currentColor;
  box-shadow: -8px 0 0 -3px currentColor, 8px 0 0 -3px currentColor,
    0 -8px 0 -3px currentColor, 0 8px 0 -3px currentColor,
    -6px -6px 0 -3px currentColor, -6px 6px 0 -3px currentColor,
    6px -6px 0 -3px currentColor, 6px 6px 0 -3px currentColor;
}
</style>
