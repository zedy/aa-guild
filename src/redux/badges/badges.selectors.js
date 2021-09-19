import { createSelector } from 'reselect';

const selectBadges = state => state.badges;

export const getBadges = createSelector([selectBadges], badges => badges.list);
