"use strict";

exports.__esModule = true;
exports["default"] = _default;

var _history = require("history");

function _default(apis, options) {
  if (apis === void 0) {
    apis = {};
  }

  var _apis = apis,
      stringifyLocation = _apis.stringifyLocation,
      parseLocation = _apis.parseLocation;
  var history = (0, _history.createHashHistory)();

  function reactParseLocation(loc) {
    if (loc && typeof loc !== "string") {
      loc = (0, _history.createPath)(loc);
    }

    return parseLocation(loc);
  }

  function getTopPage() {
    var topPage = history.location;
    return (0, _history.createPath)(topPage);
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