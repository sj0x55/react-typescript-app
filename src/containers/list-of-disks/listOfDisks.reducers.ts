import { PayloadAction } from '@reduxjs/toolkit';

export const updateCapacityMin = (state: ListOfDisksState, action: PayloadAction<number>) => {
  state.capacityMin = action.payload;
};

export const updateCapacityMax = (state: ListOfDisksState, action: PayloadAction<number>) => {
  state.capacityMax = action.payload;
};
