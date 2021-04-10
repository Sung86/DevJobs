<template>
  <div :class="$style.container">
    <div :class="$style['filter-normal']">
      <label><SearchIcon /></label>
      <input
        type="text"
        placeholder="Filter by title, companies..."
        v-model="inputs.description"
      />
    </div>
    <div :class="$style['filter-location']" v-if="!isOnScreenSm">
      <label><LocationIcon /></label>
      <input
        type="text"
        placeholder="Filter by location"
        v-model="inputs.location"
      />
    </div>
    <div :class="$style['filter-fulltime']" v-if="!isOnScreenSm">
      <div>
        <input type="checkbox" v-model="inputs.fulltime" />
      </div>
      <label>Full Time</label>
    </div>
    <div :class="$style['search-btn']" @click="search()">
      <Button :label="`Search`" :labelColour="`#fff`" :btnColour="`#5a52ff`" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  components: {
    SearchIcon: () => import("@/components/icons/SearchIcon"),
    LocationIcon: () => import("@/components/icons/LocationIcon"),
    Button: () => import("@/components/buttons/Button"),
  },
  created() {
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
  },
  data: () => ({
    inputs: {
      description: null,
      location: null,
      fulltime: false,
    },
    window: {
      width: 0,
      height: 0,
    },
  }),
  computed: {
    isOnScreenSm() {
      return this.window.width <= 600;
    },
  },
  methods: {
    ...mapActions(["fetchJobs"]),
    search() {
      const inputs = this.inputs;
      if (
        inputs.description !== null ||
        inputs.location !== null ||
        inputs.fulltime
      ) {
        this.fetchJobs(inputs);
      }
    },
    handleWindowResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.handleWindowResize);
  },
};
</script>

<style lang="scss" module>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixin.scss";

.container {
  @include flex("row", space-between);
  height: 30px;
  padding: 20px;
  & > div {
    width: 80%;
    @include flex(row, center);
  }
  & > div > input[type="text"] {
    height: 90%;
    width: 100%;
    border: none;
    font-size: 12pt;
    margin-top: 3px;
    outline: none;
  }
  .filter-normal,
  .filter-location {
    label {
      margin: 25px 25px 0 10px;
    }
    border-right: 3px solid rgb(237, 237, 237);
    height: 70px;
    margin-top: -20px;
    @include mediaQueries($screenSm) {
      border-right: none;
    }
  }
  .filter-fulltime {
    width: 60%;
    height: 20px;

    & > div {
      input {
        cursor: pointer;
        margin: 7px 0 0 30px;
        width: 27px;
        transform: scale(2);
      }
    }
    label {
      margin: 5px 0 0 0;
      font-weight: bold;
    }
  }
  .search-btn {
    height: 50px;
    width: 30%;
    transform: translateY(-20%);
  }
}
</style>
