const queryString = require("query-string");

export function parseLocation(path) {
  let pathname = path || "/";
  let hash = "";
  let search = "";
  const hashIndex = pathname.indexOf("#");
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
    if (hash === "#") {
      hash = "";
    }
  }
  const searchIndex = pathname.indexOf("?");
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
    if (search === "?") {
      search = "";
    }
  }

  return {
    pathname,
    hash,
    search,
    searchData: queryString.parse(search),
    hashData: queryString.parse(hash)
  };
}

export function stringiLocation(location) {
  let { pathname, search, hash, searchData, hashData } = location;
  if (!pathname) {
    pathname = "/";
  }
  if (searchData) {
    search = queryString.stringify(searchData);
  }
  if (search && search !== "?") {
    if (search.charAt(0) !== "?") {
      search = "?" + search;
    }
  }
  pathname += search;

  if (hashData) {
    hash = queryString.stringify(hashData);
  }
  if (hash && hash !== "#") {
    if (hash.charAt(0) !== "#") {
      hash = "#" + hash;
    }
    pathname += hash;
  }
  return pathname;
}
