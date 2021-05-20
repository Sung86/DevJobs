/* eslint-disable no-empty-pattern */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isDarkMode: false,
		filteredJobList: null,
		jobList: null,
	},
	getters: {
		getJobList: (state) => state.jobList,
		getFilteredJobList: (state) => state.filteredJobList,
		getIsDarkMode: (state) => state.isDarkMode,
	},
	mutations: {
		setJobList: (state, val) => {
			state.jobList = val;
		},
		setFilteredJobList: (state, val) => {
			state.filteredJobList = val;
		},
		setIsDarkMode: (state, val) => {
			state.isDarkMode = val;
		},
	},
	actions: {
		convertToMonthNumber({}, payload) {
			const monthName = payload.monthName;
			const months = [
				"jan",
				"feb",
				"mar",
				"apr",
				"may",
				"jun",
				"jul",
				"aug",
				"sep",
				"oct",
				"nov",
				"dec",
			];
			return months.indexOf(monthName.toLowerCase()) + 1;
		},
		calculateJobAge({ dispatch }, payload) {
			return new Promise((resolve) => {
				const jobCreatedAt = payload.jobCreatedAt;

				//job date created in UTC
				const dateCreated = new Date(jobCreatedAt).toUTCString().split(" ");
				const monthCreated = dispatch("convertToMonthNumber", {
					monthName: dateCreated[2],
				});
				const dayCreated = parseInt(dateCreated[1]);
				const yearCreated = dateCreated[3];
				const timeCreated = dateCreated[4].split(":");

				//current local time in UTC
				const localDateNow = new Date().toUTCString().split(" ");
				const monthNow = dispatch("convertToMonthNumber", {
					monthName: localDateNow[2],
				});
				const dayNow = parseInt(localDateNow[1]);
				const yearNow = localDateNow[3];
				const timeNow = localDateNow[4].split(":");

				if (yearNow > yearCreated)
					resolve(
						`${yearNow - yearCreated} ${
							yearNow - yearCreated > 1 ? "years" : "year"
						}`
					);
				else if (monthNow > monthCreated)
					resolve(
						`${monthNow - monthCreated} ${
							monthNow - monthCreated > 1 ? "months" : "month"
						}`
					);
				else if (dayNow > dayCreated)
					resolve(
						`${dayNow - dayCreated} ${dayNow - dayCreated > 1 ? "days" : "day"}`
					);
				else {
					const hourCreated = parseInt(timeCreated[0]);
					const minuteCreated = parseInt(timeCreated[1]);
					const secondsCreated = parseInt(timeCreated[2]);

					const hourNow = parseInt(timeNow[0]);
					const minuteNow = parseInt(timeNow[1]);
					const secondsNow = parseInt(timeNow[2]);
					if (hourNow > hourCreated)
						resolve(
							`${hourNow - hourCreated} ${
								hourNow - hourCreated > 1 ? "hours" : "hour"
							}`
						);
					else if (minuteNow > minuteCreated)
						resolve(
							`${minuteNow - minuteCreated} ${
								minuteNow - minuteCreated > 1 ? "minutes" : "minute"
							}`
						);
					else
						resolve(
							`${secondsNow - secondsCreated} ${
								secondsNow - secondsCreated > 1 ? "seconds" : "second"
							}`
						);
				}
			});
		},
		fetchJobs({ commit, getters }, payload) {
			return new Promise((resolve) => {
				const description = payload.description;
				const location = payload.location;
				const full_time = payload.fulltime;
				const page = payload.page;
				const axios = require("axios");
				const url =
					"https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";

				let params = {
					headers: {
						"Content-Type": "text/html",
						"Retry-After": 3600,
					},
					full_time,
					markdown: false,
				};
				if (page) params["page"] = page;
				if (description) params["description"] = description;
				if (location) params["location"] = location;
				axios
					.get(url, {
						params,
					})
					.then((response) => {
						if (description || location || full_time) {
							commit("setFilteredJobList", response.data);
							if (getters.getJobList != null) commit("setJobList", null);
						} else {
							const jobList = getters.getJobList;
							if (jobList === null) {
								commit("setJobList", response.data);
							} else {
								commit("setJobList", [...jobList, ...response.data]);
							}
							if (getters.getFilteredJobList != null)
								commit("setFilteredJobList", null);
						}
						resolve();
					});
			});
		},
	},
});
