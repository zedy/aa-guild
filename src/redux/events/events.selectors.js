import { createSelector } from 'reselect';

const selectEvents = state => state.events;

export const getEventsList = createSelector(
  [selectEvents],
  events => events.list
);

export const getSplitEventList = createSelector([selectEvents], events =>
  splitEventsBasedOnDate(events.list)
);

export const getFutureEvents = createSelector([selectEvents], events =>
  splitEventsBasedOnDate(events.list, 'past')
);

export const getPastEvents = createSelector([selectEvents], events =>
  splitEventsBasedOnDate(events.list, 'future')
);

export const getListByID = createSelector([selectEvents], events =>
  sortEvents(events.list)
);

const splitEventsBasedOnDate = (events, key = null) => {
  let data = {
    future: [],
    past: []
  };

  let now = Date.parse(new Date()) / 1000;

  if (key) {
    delete data[key];
  }

  events.forEach(function (value) {
    const index = now > value.date.seconds ? 'past' : 'future';

    if (key && key === index) {
      return;
    }

    data[index].push(value);
  });

  return data;
};

const sortEvents = events => {
  let sortedEvents = {};

  events.forEach(function (event) {
    sortedEvents[event.id] = event;
  });

  return sortedEvents;
};
