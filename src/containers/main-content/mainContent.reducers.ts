import { PayloadAction } from '@reduxjs/toolkit';

export const cleanData = (state: MainContentState) => {
  state.data = [];
};

export const toggleIsNew = (state: MainContentState, action: PayloadAction<boolean>) => {
  state.isNew = action.payload;
};

export const toggleIsUsed = (state: MainContentState, action: PayloadAction<boolean>) => {
  state.isUsed = action.payload;
};

export const setLoadingStatus = (state: MainContentState) => {
  state.status = 'loading';
};

export const setFulfilledStatus = (state: MainContentState, action: PayloadAction<MainContentItem[]>) => {
  state.status = 'idle';
  state.data = action.payload;
};
