import { RootState } from 'app/store';

export const selectCapacityMin = (state: RootState) => state.disks.capacityMin;
export const selectCapacityMax = (state: RootState) => state.disks.capacityMax;
