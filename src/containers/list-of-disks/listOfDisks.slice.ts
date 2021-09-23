import { createSlice } from '@reduxjs/toolkit';
import * as reducers from './listOfDisks.reducers';

const initialState: ListOfDisksState = {
  capacityMin: null,
  capacityMax: null,
};

export const { reducer, actions } = createSlice({
  name: 'disks',
  initialState,
  reducers,
});

export default reducer;
