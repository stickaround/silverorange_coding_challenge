import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getRepositories, getRepository } from '../../services/api';
import { Repository } from '../../types';
import { RootState } from '../../store';

interface RepositoryState {
  repositories: Repository[];
  repository: Repository | null;
  loading: boolean;
}

const initialState: RepositoryState = {
  repositories: [],
  repository: null,
  loading: false,
};

export const getRepositoriesSync = createAsyncThunk(
  'getRepositories',
  async (language: string) => {
    const { data: repositories } = await getRepositories(language);
    return { repositories };
  }
);

export const getRepositorySync = createAsyncThunk(
  'getRepository',
  async (repositoryName: string) => {
    const { data: repository } = await getRepository(repositoryName);
    return { repository };
  }
);

const repositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRepositoriesSync.pending, (state) => {
        state.loading = true;
        state.repositories = [];
      })
      .addCase(getRepositoriesSync.fulfilled, (state, action) => {
        state.loading = false;
        state.repositories = [...action.payload.repositories];
      })
      .addCase(getRepositoriesSync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getRepositorySync.pending, (state) => {
        state.repository = null;
        state.loading = true;
      })
      .addCase(getRepositorySync.fulfilled, (state, action) => {
        state.loading = false;
        state.repository = { ...action.payload.repository };
      })
      .addCase(getRepositorySync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const repositoryActions = repositorySlice.actions;

export const selectRepositories = (state: RootState) =>
  state.repository.repositories;
export const selectRepository = (state: RootState) =>
  state.repository.repository;
export const selectLoading = (state: RootState) => state.repository.loading;

const repositoryReducer = repositorySlice.reducer;
export default repositoryReducer;
