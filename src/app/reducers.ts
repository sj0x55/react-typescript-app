import { set } from 'lodash';
import { PayloadAction } from '@reduxjs/toolkit';

export const cleanData = (state: AppState) => {
  state.data = [];
};

export const toggleIsNew = (state: AppState, action: PayloadAction<boolean>) => {
  state.filters.isNew = action.payload;
};

export const toggleIsUsed = (state: AppState, action: PayloadAction<boolean>) => {
  state.filters.isUsed = action.payload;
};

export const updateProductFilter = (
  state: AppState,
  action: PayloadAction<{ type: ProductTypes; property: string; value: unknown }>,
) => {
  const { type, property, value } = action.payload;

  set(state.filters, [type, property], value);
};

export const setLoadingStatus = (state: AppState) => {
  state.status = 'loading';
};

export const setFulfilledStatus = (state: AppState, action: PayloadAction<Product[]>) => {
  state.status = 'idle';
  state.data = action.payload;
};
