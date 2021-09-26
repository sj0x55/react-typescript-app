import { get } from 'lodash';
import { RootState } from 'app/store';
import { Statuses } from 'app/constants';

export const selectStatus = (state: RootState) => get(state.app, 'status');
export const isLoading = (state: RootState) => selectStatus(state) === Statuses.Loading;
export const selectData = (state: RootState) => get(state.app, 'data');
export const selectFilters = (state: RootState) => get(state.app, 'filters');
export const selectProductFilters = (type: ProductTypes) => (state: RootState) => get(state.app, ['filters', type]);
export const selectIsNew = (state: RootState) => get(selectFilters(state), 'isNew');
export const selectIsUsed = (state: RootState) => get(selectFilters(state), 'isUsed');
