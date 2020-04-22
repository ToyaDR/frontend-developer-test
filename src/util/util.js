export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

export const sortByDate = (sortAscending) => ({ timestamp: date1 }, { timestamp: date2 }) => {
    if (sortAscending) {
        if (date1 < date2) { return -1; }
        else if (date1 === date2) { return 0; }
        else { return 1; }
    } else {
        if (date2 < date1) { return -1; }
        else if (date1 === date2) { return 0; }
        else { return 1; }
    }
};