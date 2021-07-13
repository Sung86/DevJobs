/* eslint-disable no-empty-pattern */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isDarkMode: false,
    jobList: null,
    jobLimit: 9,
    isLoading: false
  },
  getters: {
    getJobList: (state) => state.jobList,
    getIsDarkMode: (state) => state.isDarkMode,
    getJobLimit: (state) => state.jobLimit,
    getIsLoading: (state) => state.isLoading,
  },
  mutations: {
    setJobList: (state, val) => {
      state.jobList = val;
    },
    setIsDarkMode: (state, val) => {
      state.isDarkMode = val;
    },
    setJobLimit: (state, val) => {
      state.jobLimit = val;
    },
    setIsLoading: (state, val) => {
      state.isLoading = val;
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
    fetchJobs({ commit }) {
      return new Promise((resolve) => {
        const axios = require("axios");
        const API_END_POINT = "https://remotive.io/api/remote-jobs?category=software-dev";
        axios
          .get(API_END_POINT)
          .then(response =>{
            const jobs = response.data.jobs;
            commit('setJobList', jobs);
            resolve();
        })
      });
    },
    resetJobLimit({ commit }){
      commit('setJobLimit', 9);
    }
  },
});
