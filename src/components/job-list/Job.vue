<template>
  <div :class="$style.container">
    <div v-if="job.company_logo" :class="$style['logo-container']">
      <img :src="job.company_logo" :class="$style.logo" />
    </div>
    <div :class="[$style.flex]">
      {{ jobAge + " ago" }}
      <span :class="$style.dot" />
      {{ job.type }}
    </div>
    <p :class="$style['title']">{{ job.title }}</p>
    <p :class="$style['company']">{{ job.company }}</p>
    <p :class="$style['location']">{{ job.location }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["job"],
  data: () => ({
    jobAge: null,
  }),
  async created() {
    this.jobAge = await this.calculateJobAge({
      jobCreatedAt: this.job.created_at,
    });
  },
  methods: {
    ...mapActions(["calculateJobAge"]),
  },
};
</script>

<style lang="scss" module>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixin.scss";
.container {
  height: 150px;
  width: auto;
  padding: 60px 30px;
  position: relative;

  .logo-container {
    position: absolute;
    background: $imgCardBgColour;
    border-radius: 25px;
    width: 90px;
    height: 60px;
    transform: translateY(-150%);
    .logo {
      border-radius: 25px;
      width: 100%;
      height: 100%;
    }
  }
  .flex {
    @include flex(row, none);
    .dot {
      @include dot;
    }
  }
  .flex,
  .company {
    color: #9a9393;
  }
  .title {
    font-weight: bold;
    font-size: auto;
    word-wrap: break-word;
  }
  .location {
    font-weight: bold;
    color: #5a5ae1;
  }
}
</style>
