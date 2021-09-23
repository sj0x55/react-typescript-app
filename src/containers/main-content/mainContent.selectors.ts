import { RootState } from 'app/store';
import { Statuses } from './mainContent.constants';

export const selectStatus = (state: RootState) => state.mainContent.status;
export const isLoading = (state: RootState) => selectStatus(state) === Statuses.Loading;
export const selectIsNew = (state: RootState) => state.mainContent.isNew;
export const selectIsUsed = (state: RootState) => state.mainContent.isUsed;
export const selectData = (state: RootState) => state.mainContent.data;
