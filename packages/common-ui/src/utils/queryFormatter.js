import moment from "moment";

export function stringifyTimeScope(dateRange = [], dateLatest) {
  if (dateRange.length === 2) {
    dateRange = [
      moment(dateRange[0])
        .hour(0)
        .minute(0)
        .second(0)
        .unix(),
      moment(dateRange[1])
        .hour(23)
        .minute(59)
        .second(59)
        .unix()
    ];
  } else if (dateLatest) {
    let before = moment()
      .hour(0)
      .minute(0)
      .second(0)
      .add(1, "days");

    if (dateLatest === "l1m") {
      before = before.subtract(1, "months");
    } else if (dateLatest === "l3m") {
      before = before.subtract(3, "months");
    } else if (dateLatest === "l6m") {
      before = before.subtract(6, "months");
    } else if (dateLatest === "l1y") {
      before = before.subtract(1, "years");
    } else {
      before = before.subtract(7, "days");
    }

    dateRange = [
      before.unix(),
      moment()
        .hour(23)
        .minute(59)
        .second(59)
        .unix()
    ];
  }

  return dateRange.join();
}

export function stringifyMonthScope(dateRange, dateLatest) {
  if (dateRange && dateRange.length === 2) {
    const begin = moment(dateRange[0])
      .clone()
      .date(1)
      .hour(0)
      .minute(0)
      .second(0);
    const end = moment(dateRange[1])
      .clone()
      .date(moment(dateRange[1]).daysInMonth())
      .hour(23)
      .minute(59)
      .second(59);
    dateRange = [begin.unix(), end.unix()];
  } else {
    let before = moment()
      .hour(0)
      .minute(0)
      .second(0)
      .add(1, "month");

    if (dateLatest === "6") {
      before = before.subtract(6, "months");
    } else if (dateLatest === "12") {
      before = before.subtract(12, "months");
    } else {
      before = before.subtract(3, "months");
    }

    dateRange = [
      before.unix(),
      moment()
        .hour(23)
        .minute(59)
        .second(59)
        .unix()
    ];
  }

  return dateRange;
}

export function stringifyDateMonth(dateMonth) {
  const month = dateMonth ? moment(dateMonth) : moment();
  const begin = month
    .clone()
    .date(1)
    .hour(0)
    .minute(0)
    .second(0);
  const end = month
    .clone()
    .date(month.daysInMonth())
    .hour(23)
    .minute(59)
    .second(59);

  return [begin.unix(), end.unix()].join();
}

export function stringifyPageStart(page, pageSize) {
  if (page < 1) {
    return 0;
  }
  return (page - 1) * pageSize;
}

export function stringifySortOrder(sortOrder) {
  if (sortOrder === "ascend") {
    return "asc";
  } else if (sortOrder === "descend") {
    return "desc";
  }
}

export function stringifySort(sort, sortOrder) {
  if (sort) {
    return sort + " " + (sortOrder === "ascend" ? "ASC" : "DESC");
  }
}
