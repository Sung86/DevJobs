<template>
	<div :class="$style.overlay">
		<div :class="$style.container">
			<h2 :class="$style.msgTitle">IMPORTANT NOTICE</h2>
			<h3>
				<p>
					Due to GitHub has changed its API direction recently(<a
						:href="gitHubBlogPostUrl"
						>Click here to see GitHub blog post</a
					>), this requires you to go to
					<a :href="gitHubJobsApiUrl">this link</a> and request for the API by
					clicking the "<i>Request temporary access to the demo sever</i>"
					button for this website to load the job advertisements. Come back and
					reload this website after clicking the button. Appreciate.
				</p>
			</h3>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		gitHubBlogPostUrl:
			"https://github.blog/changelog/2021-04-19-deprecation-notice-github-jobs-site/",
		gitHubJobsApiUrl:
			"https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json",
	}),
};
</script>

<style lang="scss" module>
.overlay {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 100;
	.container {
		margin: auto;
		transform: translateY(-50%);
		top: 50%;
		position: fixed;
		box-shadow: 5px 10px black;
		border: 1px solid black;
		border-radius: 25px;
		padding: 6em;
		background-color: white;
		.msgTitle {
			color: red;
			text-align: center;
		}
	}
}
</style>
