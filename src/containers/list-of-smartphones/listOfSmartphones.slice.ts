import { createSlice } from '@reduxjs/toolkit';
import * as reducers from './listOfSmartphones.reducers';

const initialState: ListOfSmartphonesState = {};

export const { reducer, actions } = createSlice({
  name: 'smartphones',
  initialState,
  reducers,
});

export default reducer;
