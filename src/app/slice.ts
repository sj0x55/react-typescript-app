import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Statuses } from 'app/constants';
import { fetchDataPayloadCreator } from 'app/operations';
import * as reducers from 'app/reducers';

const initialState: AppState = {
  status: Statuses.Idle,
  data: [],
  filters: {
    isNew: true,
    isUsed: true,
  },
};

export const fetchDataAsync = createAsyncThunk('data/fetch', fetchDataPayloadCreator);
export const { reducer, actions } = createSlice({
  name: 'data',
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataAsync.pending, reducers.setLoadingStatus)
      .addCase(fetchDataAsync.fulfilled, reducers.setFulfilledStatus);
  },
});

export default reducer;
