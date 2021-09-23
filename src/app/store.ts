import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import mainContentReducer from 'containers/main-content/mainContent.slice';
import listOfDisksReducer from 'containers/list-of-disks/listOfDisks.slice';

export const store = configureStore({
  reducer: {
    mainContent: mainContentReducer,
    disks: listOfDisksReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
