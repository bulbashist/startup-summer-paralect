import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Root } from "react-dom/client";
import { RootState } from "./store";
import { IOptions, IProfile, IRepo } from "./types";

const getProfileData = createAsyncThunk("profileData", async (url: string) => {
  const res = await fetch(url);
  const data = res.json();
  return data;
});

const getRepos = createAsyncThunk(
  "reposData",
  async (props: { url: string; page: number }) => {
    const res = await fetch(`${props.url}?page=${props.page}&per_page=5`);
    const data = res.json();
    return data;
  }
);

const allData = createSlice({
  name: "profile",
  initialState: {
    profile: {} as IProfile,
    repos: [] as Array<IRepo>,
    options: { loading: true } as IOptions,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileData.pending, (state: RootState) => {
        return {
          ...state,
          options: {
            loading: true,
          },
        };
      })
      .addCase(
        getProfileData.fulfilled,
        (state: RootState, action: PayloadAction<IProfile>) => {
          state.profile = action.payload;
          state.options.loading = false;
          return state;
        }
      )
      .addCase(
        getRepos.fulfilled,
        (state: RootState, action: PayloadAction<Array<IRepo>>) => {
          state.repos = action.payload;
          return state;
        }
      );
  },
});

export { getProfileData, getRepos };
export default allData.reducer;
