import { createSelector } from 'reselect';

const selectMisc = state => state.misc;

export const getAboutUs = createSelector([selectMisc], misc => misc.aboutus);

export const getBadges = createSelector([selectMisc], misc => misc.badges);
