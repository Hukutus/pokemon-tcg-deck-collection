import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TSettings = {
  formats: {
    standard?: boolean;
    expanded?: boolean;
    unlimited?: boolean;
  };
};

export interface SettingsState {
  value?: TSettings;
  status: "idle" | "loading" | "failed";
}

const initialState: SettingsState = {
  value: undefined,
  status: "idle",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    update: (state, { payload }: PayloadAction<TSettings>) => {
      state.value = payload;
    },
  },
});

export const { update } = settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings.value;

export default settingsSlice.reducer;
