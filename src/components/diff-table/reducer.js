import { sortByDate } from "../../util/util";

export function reducer(state, action) {
    switch (action.type) {
        case 'updateData':
            const updatedData = state.data.concat(action.data);
            updatedData.sort(sortByDate(state.sortAscending));
            return {
                data: updatedData,
            };
        case 'toggleSortAscending':
            return {
                sortAscending: !state.sortAscending,
                data: state.data.sort(sortByDate(!state.sortAscending)),
            };
        default:
            throw new Error();
    }
}

export function initialState() {
    return {
        data: [],
        sortAscending: false,
    };
}