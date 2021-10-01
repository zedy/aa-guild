import { createSelector } from 'reselect';

const selectDMs = state => state.dms;

export const getDMs = createSelector([selectDMs], dms => dms.list);
