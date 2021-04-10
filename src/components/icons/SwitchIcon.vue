<template>
  <label :class="$style.switch" :style="styleVars">
    <input type="checkbox" v-model="isSwitchOn" />
    <div :class="[$style.slider, $style.round]"></div>
  </label>
</template>

<script>
export default {
  props: ["marginLeft", "marginTop", "isDarkMode"],
  created() {
    this.isSwitchOn = this.isDarkMode;
  },
  data: () => ({
    isSwitchOn: false,
  }),
  watch: {
    isSwitchOn(newVal) {
      this.$emit("isSwitchOn", newVal);
    },
  },
  computed: {
    styleVars() {
      return {
        "margin-left": this.marginLeft,
        "margin-top": this.marginTop,
      };
    },
  },
};
</script>

<style lang="scss" module>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixin.scss";
$marginLeft: margin-left;
$marginTop: margin-top;
.switch {
  margin-left: $marginLeft;
  margin-top: $marginTop;
  position: relative;
  display: inline-block;
  width: 55px;
  height: 25px;
  input {
    display: none;
  }
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 5px;
    bottom: 2px;
    background-size: 400%;
    @include linearGradient($gradient1, $colour1);
    animation: bg-animation 10s infinite alternate;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  &.round {
    border-radius: 34px;
    &:before {
      border-radius: 50%;
    }
  }
}
input {
  &:checked {
    & + .slider {
      &:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }
    }
  }
  &:focus {
    & + .slider {
      box-shadow: 0 0 1px #101010;
    }
  }
}
</style>
