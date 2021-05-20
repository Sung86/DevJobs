<template>
	<div :class="$style.container">
		<div v-if="isShowEnableApiMessage">
			<EnableApiMessage />
		</div>
		<div :class="$style['search-bar']">
			<SearchBar />
		</div>
		<div :class="$style['job-list']">
			<JobList />
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	data: () => ({
		isShowEnableApiMessage: false,
	}),
	mounted() {
		setTimeout(() => {
			if (this.getJobList === null) this.isShowEnableApiMessage = true;
		}, 3000);
	},
	components: {
		EnableApiMessage: () => import("@/components/messages/EnableApiMessage"),
		SearchBar: () => import("@/components/search-bar/SearchBar"),
		JobList: () => import("@/components/job-list/JobList"),
	},
	computed: {
		...mapGetters(["getJobList"]),
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
