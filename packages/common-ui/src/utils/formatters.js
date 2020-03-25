import moment from "moment";

export function formatPrice(money) {
  if (money === undefined || money === null || money === "") {
    return "--";
  }

  money = +money;
  if (isNaN(money)) {
    return "--";
  }

  return (money / 100).toFixed(2).replace(/\d(?=(?:\d{3})+\.)/g, "$&,");
}

//dateX 时间戳  type；返回时间格式
export function formatDate(dateX, type) {
  let date;

  if (dateX) {
    date = moment(dateX, "X");
  } else {
    return "--";
  }

  if (type === "short") {
    return date.format("YYYY-MM-DD");
  } else if (type === "YM") {
    return date.format("YYYY-MM");
  } else if (type === "Y") {
    return date.format("YYYY");
  } else if (type === "MM-DD") {
    return date.format("MM-DD");
  }

  return date.format("YYYY-MM-DD HH:mm:ss");
}
