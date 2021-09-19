export const setBadges = data => ({
  type: 'SET_BADGES',
  payload: data
});

export const addBadgeToState = badge => ({
  type: 'ADD_BADGE',
  payload: badge
});

export const updateBadgeByID = badge => ({
  type: 'UPDATE_BADGE',
  payload: badge
});
