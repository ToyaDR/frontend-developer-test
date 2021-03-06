const sortByState = (sortState, sortAscending, values) => {
  switch (sortState) {
  case 'date':
  default:
    values.sort(({ timestamp: date1 }, { timestamp: date2 }) => {
      if (date1 < date2) { return -1; }
      else if (date1 === date2) { return 0; }
      else { return 1; }
    });
    break;
  }

  if (!sortAscending) {
    values.reverse();
  }

  return values;
};

export function reducer(state, action) {
  switch (action.type) {
  case 'updateData':
    return {
      ...state,
      data: sortByState(state.sortState, state.sortAscending, action.data)
    };
  case 'toggleSortAscending':
    return {
      ...state,
      sortAscending: !state.sortAscending,
      data: sortByState(state.sortState, !state.sortAscending, state.data)
    };
  case 'setSortState':
    return {
      ...state,
      sortState: action.sortState,
      data: sortByState(action.sortState, state.sortAscending, state.data)
    };
  default:
    throw new Error();
  }
}

export function initialState(data) {
  return {
    data: sortByState('date', false, data),
    sortAscending: false,
    sortState: 'date',
  };
}