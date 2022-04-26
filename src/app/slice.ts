import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RESULTS_PER_PAGE } from '../App';
import { RootState } from './store';
import { IOptions, IProfile, IRepo } from './types';

const getProfileData = createAsyncThunk('profileData', async (url: string): Promise<IProfile> => {
  const res: Response = await fetch(url);
  const data: Promise<IProfile> = res.json();
  return data;
});

const getRepos = createAsyncThunk(
  'reposData',
  async (props: { url: string; page: number }): Promise<Array<IRepo>> => {
    const res: Response = await fetch(
      `${props.url}?page=${props.page}&per_page=${RESULTS_PER_PAGE}`
    );
    const data: Promise<Array<IRepo>> = res.json();
    return data;
  }
);

const allData = createSlice({
  name: 'allData',
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
      .addCase(getProfileData.fulfilled, (state: RootState, action: PayloadAction<IProfile>) => {
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
      })
      .addCase(getRepos.fulfilled, (state: RootState, action: PayloadAction<Array<IRepo>>) => {
        return {
          ...state,
          repos: action.payload,
        };
      });
  },
});

export { getProfileData, getRepos };
export default allData.reducer;
