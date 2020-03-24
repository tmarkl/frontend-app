import { createHashHistory, createPath } from "history";
export default function (apis, options) {
  if (apis === void 0) {
    apis = {};
  }

  var _apis = apis,
      stringifyLocation = _apis.stringifyLocation,
      parseLocation = _apis.parseLocation;
  var history = createHashHistory();

  function reactParseLocation(loc) {
    if (loc && typeof loc !== "string") {
      loc = createPath(loc);
    }

    return parseLocation(loc);
  }

  function getTopPage() {
    var topPage = history.location;
    return createPath(topPage);
  }

  function navigateTo(route) {
    if (typeof route !== "string") {
      route = stringifyLocation(route);
    }

    history.push(route);
    return delay();
  }

  function redirectTo(route) {
    if (typeof route !== "string") {
      route = stringifyLocation(route);
    }

    history.replace(route);
    return delay();
  }

  function navigateBack() {
    history.goBack();
    return delay();
  }

  return {
    history: history,
    getTopPage: getTopPage,
    navigateBack: navigateBack,
    navigateTo: navigateTo,
    redirectTo: redirectTo,
    parseLocation: reactParseLocation
  };
}

function delay() {
  return new Promise(function (resolve) {
    return setTimeout(function () {
      return resolve();
    }, 50);
  });
}