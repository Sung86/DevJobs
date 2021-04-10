<template>
  <div
    :class="$style.btn"
    :style="[styleVars, pressEffect]"
    @mouseenter="hover(true)"
    @mouseleave="[hover(false), mouseUp()]"
    @mousedown="mouseDown()"
    @mouseup="mouseUp()"
  >
    <p :class="$style.btnLabel">{{ label }}</p>
  </div>
</template>

<script>
export default {
  props: ["label", "labelColour", "btnColour"],
  created() {
    this.lblColor = this.labelColour;
    this.btnColor = this.btnColour;
  },
  computed: {
    styleVars() {
      return {
        color: this.lblColor,
        "background-color": this.btnColor,
      };
    },
  },
  data: () => ({
    lblColor: null,
    btnColor: null,
    pressEffect: {},
  }),
  methods: {
    mouseUp() {
      this.pressEffect = {};
    },
    mouseDown() {
      this.pressEffect = {
        "box-shadow": " 0 5px gray",
        transform: "translateY(2px)",
      };
    },
    hover(isHover) {
      if (["#d2d2eb", "#adadb8"].includes(this.btnColor)) {
        this.btnColor = isHover ? "#adadb8" : "#d2d2eb";
      } else {
        this.btnColor = isHover ? "#2d23f0" : "#5a52ff";
      }
    },
  },
};
</script>

<style lang="scss" module>
@import "@/assets/styles/mixin.scss";
$labelColour: background-color;
$btnColour: color;

.btn {
  color: #d2d2eb;
  cursor: pointer;
  @include flex(row, center);
  background-color: $btnColour;
  border-radius: 5px;
  height: 100%;
  width: 100%;
  padding: 0 15px;
  .btnLabel {
    font-weight: bold;
    color: $labelColour;
  }
}
</style>
