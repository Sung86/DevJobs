<template>
  <div>
    <div :class="$style.container">
      <!-- Head -->
      <div :class="$style.head">
        <div v-if="job.company_logo" :class="$style['logo-container']">
          <img :src="job.company_logo" :class="$style.logo" />
        </div>
        <div :class="$style['company-info']">
          <p :class="$style.company">{{ job.company }}</p>
          <a
            :class="$style['company-url']"
            :href="job.company_url"
            target="_blank"
            >{{ job.company_url }}</a
          >
        </div>
        <div
          :class="$style['company-site-btn']"
          @click="goToLink(job.company_url)"
        >
          <Button
            :label="`Company Site`"
            :labelColour="`#3f3fc7`"
            :btnColour="`#d2d2eb`"
          />
        </div>
      </div>
      <!-- Body -->
      <div :class="$style.body">
        <div :class="$style['brief-container']">
          <div :class="$style.brief">
            <div :class="$style.gray">
              {{ jobAge + " ago" }}
              <span :class="$style.dot" />
              {{ job.type }}
            </div>
            <h1>{{ job.title }}</h1>
            <p :class="$style.gray">{{ job.location }}</p>
          </div>
          <div :class="$style['apply-now-btn']">
            <a href="#job-how-to-apply">
              <Button
                :label="`Apply Now`"
                :labelColour="`#fff`"
                :btnColour="`#5a52ff`"
              />
            </a>
          </div>
        </div>
        <div v-html="job.description" :class="$style.description"></div>
      </div>
      <!-- Leg -->
      <div id="job-how-to-apply" :class="$style.leg">
        <div>
          <b>How to Apply</b>
          <p v-html="job.how_to_apply"></p>
        </div>
      </div>
    </div>
    <!-- Foot -->
    <div :class="$style.foot">
      <div :class="$style['company-info']">
        <p :class="$style['job-title']">{{ job.title }}</p>
        <p :class="$style['job-company']">{{ job.company }}</p>
      </div>
      <div :class="$style['apply-now-btn']" @click="goToLink(job.company_url)">
        <a href="#job-how-to-apply">
          <Button
            :label="`Apply Now`"
            :labelColour="`#fff`"
            :btnColour="`#5a52ff`"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["job"],
  async created() {
    this.jobAge = await this.calculateJobAge({
      jobCreatedAt: this.job.created_at,
    });
  },
  components: {
    Button: () => import("@/components/buttons/Button"),
  },
  methods: {
    ...mapActions(["calculateJobAge"]),
    goToLink(link) {
      window.location = link;
    },
  },
  data: () => ({
    jobAge: null,
  }),
};
</script>
<style lang="scss" module>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixin.scss";
@mixin btnHnW {
  height: 50px;
  width: 130px;
  margin: 25px 40px 0 0;
}
.container {
  @include grid(1fr, 0, 30px, center);
  & > div {
    border-radius: 10px;
    width: 90%;
  }
  .head {
    background: $jobCardBgColour;
    margin-top: -50px;
    height: auto;
    @include grid(1fr 2fr 1fr, 10px, 0, space-between);
    @include mediaQueries($screenSm) {
      @include grid(1fr, 0, 0, center);
      position: relative;
      padding: 20px 0;
    }

    .logo-container {
      height: 110px;
      width: 200px;
      border-radius: 10px 0 0 10px;
      background: $imgCardBgColour;
      @include mediaQueries($screenMd) {
        width: 150px;
      }
      @include mediaQueries($screenSm) {
        border-radius: 10px;
        position: absolute;
        margin-top: -30px;
        height: 50px;
        width: 100px;
      }
      .logo {
        border-radius: 10px 0 0 10px;
        @include mediaQueries($screenSm) {
          border-radius: 10px;
        }
        width: 100%;
        height: 100%;
      }
    }
    .company-info {
      width: 80%;
      word-wrap: break-word;
      @include mediaQueries($screenSm) {
        @include grid(1fr, 0, 0, center);
      }
      .company {
        width: auto;
        font-weight: bold;
        font-size: 1.3rem;
      }
    }

    .company-site-btn {
      @include btnHnW;
    }
  }
  .body {
    background: $jobCardBgColour;
    .brief-container {
      @include grid(3fr 1fr, 0, 0, space-between);
      @include mediaQueries($screenSm) {
        @include grid(1fr, 0, 0, start);
      }
      padding: 40px 0 0 40px;
      .brief {
        .gray {
          color: gray;
        }
        div > .dot {
          @include dot;
          display: inline-block;
          margin-bottom: 2px;
        }
      }
      .apply-now-btn {
        a {
          text-decoration: none;
        }
        @include mediaQueries($screenSm) {
          width: 87%;
        }
        @include btnHnW;
      }
    }
    .description {
      padding: 0 40px;
    }
  }
  .leg {
    word-break: break-all;
    background: #5a52ff;
    margin: 0 0 20px 0;
    div {
      color: #fff;
      padding: 40px;
    }
  }
}
.foot {
  width: 100%;
  background: $jobCardBgColour;
  position: static;
  bottom: 0;
  @include grid(2fr 1fr, 0, 0, space-between);
  @include mediaQueries($screenSm) {
    padding: 0 0 20px 5px;
    @include grid(1fr, 0, 0, center);
  }
  .company-info {
    .job-title {
      font-weight: bold;
      font-size: 1.3em;
    }
    .job-company {
      color: gray;
    }
    padding-left: 80px;

    @include mediaQueries($screenSm) {
      display: none;
    }
  }
  .apply-now-btn {
    a {
      text-decoration: none;
    }
    @include mediaQueries($screenSm) {
      width: 83%;
    }
    @include btnHnW;
  }
}
</style>
