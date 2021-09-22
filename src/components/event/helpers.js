export const getInitialValues = event => {
  let init = {};

  event.attendees.forEach(userId => {
    init[userId] = event.confirmedAttendees.includes(userId);
  });

  return init;
};

export const prepValuesForFirestore = (values, initValues) => {
  const inc = [];
  const dec = [];
  const sync = [];

  Object.keys(values).forEech((value, idx) => {
    if (Object.values(values)[idx]) {
      sync.push(value);
    }

    if (Object.values(values)[idx] !== Object.values(initValues)[idx]) {
      let newObj = {};
      newObj.id = value;

      if (Object.values(values)[idx]) {
        newObj.direction = 'increase';
        inc.push(newObj);
      } else if (!Object.values(values)[idx]) {
        newObj.direction = 'decrease';
        dec.push(newObj);
      }
    }
  });

  return {
    playerList: sync,
    gamesPlayedList: [inc, dec]
  };
};

export const isPastEvent = date => {
  const now = new Date().getTime();

  return date.seconds * 1000 < now;
};
