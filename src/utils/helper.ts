export const isHash = (entity) =>
    Boolean(entity && typeof entity === "object" && !Array.isArray(entity));
  
  export const nestedKeyValue = (hash, keys) =>
    keys.reduce((hash, key) => (isHash(hash) ? hash[key] : undefined), hash);
  
  export const isUndefined = (val) =>
    val === undefined || val === null || val === "";
  
  export const evaluateSessionStatus = (status) => {
    if (!isUndefined(status)) {
      status = status.toLowerCase();
    }
    if (status === "passed") {
      return "passed";
    } else if (status === "failed" || status === "timedout") {
      return "failed";
    } else {
      return "";
    }
  };
  