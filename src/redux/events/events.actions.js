export const setEventsList = list => ({
  type: 'SET_EVENTS_LIST',
  payload: list
});

export const addEventToState = event => ({
  type: 'ADD_EVENT_TO_LIST',
  payload: event
});

export const updateEventById = event => ({
  type: 'UPDATE_EVENT_IN_LIST',
  payload: event
});
