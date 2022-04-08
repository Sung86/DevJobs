<template>
	<div :class="$style.container">
		<div :class="$style.main">
			<div :class="$style.title" @click="routeToHome()">Dev Jobs</div>
			<div :class="$style.themeModes">
				<div>
					<SunIcon :color="`#fff`" :marginLeft="`22px`" :marginTop="`8px`" />
				</div>
				<div>
					<SwitchIcon
						@isSwitchOn="toSwitchThemeMode"
						:isDarkMode="getIsDarkMode"
						:marginLeft="`40px`"
						:marginTop="`-3px`"
					/>
				</div>
				<div>
					<MoonIcon :color="`#fff`" :marginLeft="`8px`" :marginTop="`2px`" />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
	components: {
		SunIcon: () => import('@/components/icons/SunIcon'),
		MoonIcon: () => import('@/components/icons/MoonIcon'),
		SwitchIcon: () => import('@/components/icons/SwitchIcon'),
	},
	computed: {
		...mapGetters(['getIsDarkMode']),
	},
	methods: {
		...mapMutations(['setIsDarkMode']),
		toSwitchThemeMode(val) {
			localStorage.setItem('isDarkMode', val);
			this.setIsDarkMode(val);
		},
		routeToHome() {
			if (this.$route.name !== 'Home') this.$router.push({ name: 'Home' });
		},
	},
};
</script>

<style lang="scss" module>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixin.scss';

.container {
	height: 120px;
	border-radius: 0 0 0 80px;
	background-size: 400%;
	animation: bg-animation 10s infinite alternate;
	box-shadow: -6px -3px 3px 5px #606060;
	@include linearGradient($gradient1, $colour1);
	@include mediaQueries($screenSm) {
		border-radius: 0;
		height: 160px;
		box-shadow: none;
	}
	.main {
		@include flex(row, space-between);
		width: 75%;
		transform: translate(20%, 120%);
	}
	.title {
		color: #ffffff;
		font-weight: bold;
		font-size: 20pt;
		cursor: pointer;
	}
	.themeModes {
		width: 120px;
		@include flex(row, space-between);
	}
}
</style>
