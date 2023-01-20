import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getRepositories } from '../../services/api';
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
  async () => {
    const { data: repositories } = await getRepositories();
    return { repositories };
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
      })
      .addCase(getRepositoriesSync.fulfilled, (state, action) => {
        state.loading = false;
        state.repositories = [...action.payload.repositories];
      })
      .addCase(getRepositoriesSync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const repositoryActions = repositorySlice.actions;

export const selectRepositories = (state: RootState) =>
  state.repository.repositories;
export const selectLoading = (state: RootState) => state.repository.loading;

const repositoryReducer = repositorySlice.reducer;
export default repositoryReducer;
