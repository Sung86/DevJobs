<template>
  <div>
    <JobDetail :job="pickedJob" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  created() {},
  components: {
    JobDetail: () => import("@/components/job-list/JobDetail"),
  },
  computed: {
    ...mapGetters(["getJobList", "getFilteredJobList"]),
    pickedJob() {
      const jobIndex = this.$route.params.i;
      const jobList = JSON.parse(localStorage.getItem("jobs"));
      return jobList[jobIndex];
    },
  },
};
</script>
