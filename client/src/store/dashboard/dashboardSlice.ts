import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DashBoardState } from ".";
import { UserTeams } from "./interfaces";

const initialState: DashBoardState = {
  user: [],
  userTeams: [],
  activeTeam: null,
  membersActiveTeam: [],
  metricsForToday: {},
  linesMetrics: {},
  shortRecomendation: {},
  topics: [],
  longRecommendation: {},
  activeReport: [],
  dataAmount: [],
  isLoading: false,
  modalOpen: false,
  dataLoading: false,
  cards: [],
  task: [],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    onSetUser: (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
    },
    onLogOutUser: (state) => {
      state.user = [];
      state.activeTeam = null;
      state.userTeams = [];
      state.linesMetrics = [];
      state.dataAmount = [];
      state.shortRecomendation = "";
      state.metricsForToday = [];
      state.membersActiveTeam = [];
      state.longRecommendation = {};
      state.topics = [];
      state.cards = [];
      state.task = [];
      state.activeReport = [];
      state.assessment = [];
    },
    onLoadingTeam: (state) => {
      state.isLoading = true;
    },
    cleanActiveTeam: (state) => {
      state.activeTeam = null;
      state.membersActiveTeam = [];
      state.metricsForToday = [];
      state.linesMetrics = [];
      state.dataAmount = [];
      state.shortRecomendation = {};
      state.longRecommendation = {};
      state.topics = [];
      state.cards = [];
      state.task = [];
      state.activeReport = [];
      state.assessment = [];
    },
    onSetUserTeams: (
      state,
      action: PayloadAction<{
        userTeams: UserTeams[];
      }>
    ) => {
      state.userTeams = action.payload.userTeams || [];
      state.isLoading = false;
      state.modalOpen = false;
      state.dataLoading = false;
    },
    onSetActiveTeam: (
      state,
      action: PayloadAction<{
        id: number;
      }>
    ) => {
      console.log(action);

      const userTeam = state.userTeams.find((team) => team._id === action.payload.id);
      state.activeTeam = userTeam;
      state.activeReport = [];
      state.isLoading = false;
      state.modalOpen = false;
    },
    onSetActiveTeamMembers: (
      state,
      action: PayloadAction<{
        members: Members[];
      }>
    ) => {
      state.isLoading = true;
      state.membersActiveTeam = action.payload.members;
    },
    onSaveMetricsForToday: (state, { payload }) => {
      console.log(payload);

      state.metricsForToday = payload.metricsForToday;
      state.linesMetrics = payload.linesMetrics;
      state.dataAmount = payload.dataAmount;
      state.shortRecomendation = payload.shortRecomendation;
      state.topics = payload.topics;
      state.cards = payload.cards;
      state.task = payload.task;
      state.isLoading = false;
    },

    onCreateTeam: (
      state,
      action: PayloadAction<{
        team: UserTeams;
      }>
    ) => {
      state.userTeams.push(action.payload.team);
      state.isLoading = false;
    },
    onSetAssessment: (state, { payload }) => {
      console.log(payload);

      state.assessment = payload;
    },
    onToggleModal: (state, { payload }) => {
      state.modalOpen = payload;
    },
    onSetDataLoading: (state, { payload }) => {
      state.dataLoading = payload;
    },
    onSetLongRecommendation: (state, { payload }) => {
      console.log(payload);

      state.longRecommendation = payload;
    },
    onSetActiveReport: (state, { payload }) => {
      console.log(payload);
      console.log(payload);
      console.log(state.longRecommendation);
      state.activeReport = [];
      console.log(state.longRecommendation);

      state.activeReport = state.longRecommendation.filter((recommendation) => recommendation._id === payload);
      console.log(state.activeReport[0]);

      console.log(payload);
    },
  },
});

export const {
  onSetUser,
  onLogOutUser,
  onSetUserTeams,
  onLoadingTeam,
  onSetActiveTeam,
  onCreateTeam,
  onSetActiveTeamMembers,
  cleanActiveTeam,
  onSaveMetricsForToday,
  onToggleModal,
  onSetDataLoading,
  onSetLongRecommendation,
  onSetActiveReport,
  onSetAssessment,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
