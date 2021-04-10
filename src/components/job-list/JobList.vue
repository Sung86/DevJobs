<template>
  <div v-if="jobsToBeDisplayed" :class="$style.container">
    <div :class="$style['jobs-container']">
      <div
        v-for="(job, i) in jobsToBeDisplayed"
        :key="`job-${job.id}`"
        :class="$style['job-container']"
        @click="routeToJobDetailView(i)"
      >
        <Job :job="job" />
      </div>
    </div>
    <div
      :class="$style['load-more-btn']"
      @click="loadMoreJobs()"
      v-if="getJobList !== null"
    >
      <Button
        :label="`Load More`"
        :labelColour="`#fff`"
        :btnColour="`#5a52ff`"
      />
    </div>
  </div>
  <div v-else :class="$style.loading">
    <Loading />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    jobsToBeDisplayed: null,
    jobList: null,
    filteredJobList: null,
    lastJobIndex: 0,
    jobPage: 1,
  }),
  async created() {
    await this.fetchJobs({ page: this.jobPage });
  },
  components: {
    Job: () => import("./Job"),
    Button: () => import("@/components/buttons/Button"),
    Loading: () => import("@/components/layouts/Loading"),
  },
  computed: {
    ...mapGetters(["getJobList", "getFilteredJobList"]),
  },
  watch: {
    getFilteredJobList(newVal) {
      this.resetJobList();
      if (newVal != null) {
        localStorage.setItem("jobs", JSON.stringify(newVal));
        this.jobsToBeDisplayed = null;
        setTimeout(() => {
          this.jobsToBeDisplayed = JSON.parse(localStorage.getItem("jobs"));
        }, 2000);
      }
    },
    getJobList(newVal) {
      if (newVal != null) {
        localStorage.setItem("jobs", JSON.stringify(newVal));
        this.jobList = JSON.parse(localStorage.getItem("jobs"));
        this.jobsToBeDisplayed = null;
        setTimeout(() => {
          this.jobsToBeDisplayed = this.jobList.slice(
            this.lastJobIndex,
            (this.lastJobIndex += 12)
          );
        }, 2000);
      }
    },
  },
  methods: {
    ...mapActions(["fetchJobs"]),
    resetJobList() {
      this.jobPage = 0;
      this.lastJobIndex = 0;
    },
    async loadMoreJobs() {
      if (this.lastJobIndex + 12 + 1 >= this.jobList.length) {
        this.jobPage++;
        await this.fetchJobs({ page: this.jobPage });
        this.jobList = [...this.getJobList];
      }

      this.jobsToBeDisplayed = [
        ...this.jobsToBeDisplayed,
        ...this.jobList.slice(this.lastJobIndex, (this.lastJobIndex += 12)),
      ];
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
}
.loading {
  width: 120px;
  height: 120px;
  top: 50%;
  right: 50%;
  position: absolute;
}
</style>
