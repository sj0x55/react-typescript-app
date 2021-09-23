import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchDataPayloadCreator } from './mainContent.operations';
import { Statuses, ActionTypes } from './mainContent.constants';
import * as reducers from './mainContent.reducers';

const initialState: MainContentState = {
  data: [],
  isNew: true,
  isUsed: true,
  status: Statuses.Idle,
};

export const fetchDataAsync = createAsyncThunk(ActionTypes.FetchData, fetchDataPayloadCreator);
export const { reducer, actions } = createSlice({
  name: 'mainContent',
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataAsync.pending, reducers.setLoadingStatus)
      .addCase(fetchDataAsync.fulfilled, reducers.setFulfilledStatus);
  },
});

export default reducer;
