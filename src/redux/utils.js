export const updateStateObjById = (list, payload) => {
  return list.map(item => {
    if (item.id === payload.id) {
      return payload;
    }

    return item;
  });
};
