<template>
  <div :class="$style.app">
    <div :class="[getIsDarkMode ? $style['dark-mode'] : '']">
      <Header />
      <router-view />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  created() {
    if (localStorage.getItem("isDarkMode") == "true") this.setIsDarkMode(true);
    else this.setIsDarkMode(false);
  },
  components: {
    Header: () => import("@/components/layouts/Header"),
  },
  computed: {
    ...mapGetters(["getIsDarkMode"]),
  },
  methods: {
    ...mapMutations(["setIsDarkMode"]),
  },
};
</script>
<style lang="scss" module>
.app {
  background: #f4f2f2fa;
  height: 100vh;
  overflow: auto;
}
body {
  margin: 0;
  padding: 0;
}
.dark-mode {
  background: #192734;
}
</style>
