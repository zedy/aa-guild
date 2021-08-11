import { createSelector } from "reselect";

const selectDnd = state => state.dnd;

export const selectDndData = createSelector(
    [selectDnd],
    dnd => dnd.data
)