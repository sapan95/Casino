import { createSlice, configureStore } from "@reduxjs/toolkit";

const userData = localStorage.getItem("state")
  ? JSON.parse(localStorage.getItem("state")).user
  : { name: null, isLoggedIn: false, balance: 50, games: [] };

const initialState = {
  user: { ...userData },
  popUpEnable: false,
  logInEnable: false,
};

const gameSlice = createSlice({
  name: "MagicNumber",
  initialState: initialState,
  reducers: {
    toggelPop(state) {
      state.popUpEnable = !state.popUpEnable;
    },
    toggelLogIn(state) {
      state.logInEnable = !state.logInEnable;
    },
    userLoggedIn(state, action) {
      const name = action.payload;
      state.user.name = name;
      state.user.isLoggedIn = true;
      localStorage.setItem("state", JSON.stringify(state));
    },
    userLoggedOut(state, action) {
      state.user = {
        name: null,
        isLoggedIn: false,
        balance: 50,
        games: [],
      };
	  //localStorage.removeItem('name');
    },
    saveGameData(state, action) {
      const gameData = action.payload.spinData;
      const creditBonous = action.payload.creditBonous;
      state.user.games.push(gameData);
      state.user.balance = state.user.balance + creditBonous;
    },
  },
});

const store = configureStore({
  reducer: gameSlice.reducer,
});

export default store;

export const actions = gameSlice.actions;
