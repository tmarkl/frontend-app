export function setStorage(key, value) {
  return new Promise(resolve => {
    if (value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
    resolve(value);
  });
}
export function setSessionStorage(key, value) {
  return new Promise(resolve => {
    if (value === undefined) {
      sessionStorage.removeItem(key);
    } else {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
    resolve(value);
  });
}

export function getStorage(key) {
  return new Promise(resolve => {
    let value = localStorage.getItem(key);
    if (value) {
      value = JSON.parse(value);
    }
    resolve(value);
  });
}
export function getSessionStorage(key) {
  return new Promise(resolve => {
    let value = sessionStorage.getItem(key);
    if (value) {
      value = JSON.parse(value);
    }
    resolve(value);
  });
}
