<template>
  <div v-if="jobList && !getIsLoading" :class="$style.container">
    <div v-if="jobList.length > 0">
      <div :class="$style['jobs-container']">
      <div
        v-for="(job, i) in jobList.slice(0,getJobLimit)"
        :key="`${job.id}`"
        :class="$style['job-container']"
        @click="routeToJobDetailView(i)"
      >
        <Job :job="job" />
      </div>
    </div>
    <div
      :class="$style['load-more-btn']"
      @click="loadMoreJobs()"
      v-if="jobList !== null || jobList.length > 0"
    >
      <Button
        :label="`Load More`"
        :labelColour="`#fff`"
        :btnColour="`#5a52ff`"
      />
    </div>
    </div>
    <div v-else>
      <center>
        <span :class="$style['no-result-msg']">No Jobs Found</span>
      </center>
    </div>
  </div>
  
  <div v-else-if="getIsLoading" :class="$style.loading">
    <Loading />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data: () => ({
    jobList: null,
  }),
  async created() {
    this.setIsLoading(true);
    if(this.jobList === null || this.jobList.length <= 0) 
      await this.fetchJobs();
    this.setIsLoading(false); 
  },
  components: {
    Job: () => import("./Job"),
    Button: () => import("@/components/buttons/Button"),
    Loading: () => import("@/components/layouts/Loading"),
  },
  computed: {
    ...mapGetters([
      "getJobList",
      "getJobLimit",
      "getIsLoading"
    ]),
  },
  watch: {
    getJobList(newVal) {
      if (newVal != null) {
        localStorage.setItem("jobs", JSON.stringify(newVal));
        this.jobList = JSON.parse(localStorage.getItem("jobs"));
      }
    },
  },
  methods: {
    ...mapActions(["fetchJobs"]),
    ...mapMutations(["setJobLimit", "setIsLoading"]),
  
    async loadMoreJobs() {
      const jobLimit = this.getJobLimit + 9;
      this.setJobLimit(jobLimit);
    },
    routeToJobDetailView(index) {
      this.$router.push({ name: "JobDetail", params: { i: index } });
    },
  },
};
</script>

<style lang="scss" module>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixin.scss";
.container {
  margin-bottom: 10rem;
  .jobs-container {
    margin: 0 0 100px 0;
    @include grid(repeat(3, 1fr), 40px, 60px, center);
    @include mediaQueries($screenMd) {
      @include grid(repeat(2, 1fr), 40, 60px, center);
    }
    @include mediaQueries($screenSm) {
      @include grid(repeat(1, 1fr), 0, 60px, center);
    }
  }
  .job-container {
    cursor: pointer;
    width: 100%;
    height: auto;
    background: $jobCardBgColour;
    border-radius: 10px;
    box-shadow: 0px 3px 10px 1px gray;
    &:hover {
      transform: scale(1.1);
    }
  }
  .load-more-btn {
    width: 65%;
    margin: 30px 13%;
  }
  .no-result-msg{
    color:red;
  }
}
.loading {
  width: 120px;
  height: 120px;
  top: 50%;
  right: 50%;
  position: absolute;
}
</style>
