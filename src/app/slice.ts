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
    options: {
      interacted: false,
      loading: false,
      notFound: false,
    } as IOptions,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileData.pending, (state: RootState) => {
        return {
          ...state,
          options: {
            ...state.options,
            interacted: true,
            loading: true,
          },
        };
      })
      .addCase(
        getProfileData.fulfilled,
        (state: RootState, action: PayloadAction<IProfile>) => {
          if (action.payload.message) {
            return {
              ...state,
              repos: [],
              options: {
                ...state.options,
                notFound: true,
                loading: false,
              },
            };
          } else {
            return {
              ...state,
              profile: action.payload,
              options: {
                ...state.options,
                loading: false,
                notFound: false,
              },
            };
          }
        }
      )
      .addCase(
        getRepos.fulfilled,
        (state: RootState, action: PayloadAction<Array<IRepo>>) => {
          return {
            ...state,
            repos: action.payload,
          };
        }
      )
      .addCase(getRepos.rejected, (state: RootState) => {
        return {
          ...state,
          repos: [],
          options: {
            ...state.options,
            loading: false,
            notFound: true,
          },
        };
      });
  },
});

export { getProfileData, getRepos };
export default allData.reducer;
