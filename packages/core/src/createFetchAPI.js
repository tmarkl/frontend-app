import { stringiLocation } from "./location";

export default function(options = {}) {
  const { orgin, parseData } = options;
  return function fetchAPI(options = {}) {
    const { method, data } = options;
    let url = options.url || "";
    const init = {
      headers: { Accept: "application/json" },
      credentials: "include",
      method: "GET"
    };
    if (url.indexOf("://") === -1) {
      url = orgin + url;
    }
    if (method) {
      init.method = method.toUpperCase();
    }
    if (init.method === "GET") {
      if (data) {
        url = stringiLocation({ pathname: url, searchData: data });
      }
    } else {
      init.headers["Content-Type"] = "application/json";
      if (data) {
        init.body = JSON.stringify(data);
      }
    }
    return fetch(url, init)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        return parseData ? parseData(data) : data;
      });
  };
}
