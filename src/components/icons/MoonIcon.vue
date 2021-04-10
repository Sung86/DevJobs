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
$marginTop: margin-top;
.icon {
  color: $color;
  position: absolute;
  margin-left: $marginLeft;
  margin-top: $marginTop;
  width: 14px;
  height: 14px;
  transform: rotate(-20deg);
  border-radius: 50%;
  border-top: solid 1px currentColor;
  border-bottom: solid 1px currentColor;
  border-left: solid 1px currentColor;
  border-right: solid 1px transparent;

  &:before {
    content: "";
    position: absolute;
    left: 6px;
    top: 1px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    border-top: solid 1px transparent;
    border-bottom: solid 1px currentColor;
    border-left: solid 1px currentColor;
    border-right: solid 1px transparent;
  }
}
</style>
