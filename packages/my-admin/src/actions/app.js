export function launch() {
  return {
    type: "LAUNCH"
  };
}

export function launchCompletion(error, own) {
  return {
    type: "LAUNCH_COMPLETION",
    error,
    own
  };
}

export function fetchError(error) {
  return {
    type: "FETCH_ERROR",
    error
  };
}
