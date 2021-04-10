<template>
  <div :class="$style.container">
    <div :class="$style['search-bar']">
      <SearchBar />
    </div>
    <div :class="$style['job-list']">
      <JobList />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    SearchBar: () => import("@/components/search-bar/SearchBar"),
    JobList: () => import("@/components/job-list/JobList"),
  },
};
</script>
<style lang="scss" module>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixin.scss";
.container {
  @include grid(repeat(1, 1fr), 40px, 60px, center);
  & > * {
    width: 80%;
  }
  .search-bar {
    box-shadow: 0px 5px 1px 1px gray;
    border-radius: 10px;
    background: $jobCardBgColour;
    margin-top: -30px;
  }
  .job-list {
    margin-top: 10px;
  }
}
</style>
