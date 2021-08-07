import { createSelector } from "reselect";

const selectEvents = state => state.events;

export const getSplitEventList = createSelector(
  [selectEvents],
  events => splitEventsBasedOnDate(events.list)
)

export const getListByID = createSelector(
  [selectEvents],
  events => sortEvents(events.list)
)

const splitEventsBasedOnDate = events => {
  let data = {
    future: [],
    past: []
  };
  let now = Date.parse(new Date()) / 1000;

  events.forEach(function (value) {
    const index = now > value.date.seconds ? 'past' : 'future';
    data[index].push(value);
  });

  return data;
}

const sortEvents = events => {
  let sortedEvents = {};

  events.forEach(function (event) {
    sortedEvents[event.id] = event;
  });

  return sortedEvents;
}