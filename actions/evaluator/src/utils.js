
export const testsObjectToArray = testsObject =>
  Object.values(testsObject.milestones).flat();


export function timeString() {
  const d = new Date();
  return (
    `0${d.getUTCMonth() + 1}`.slice(-2) +
    `0${d.getUTCDate()}`.slice(-2) +
    "-"+
    `0${d.getHours()}`.slice(-2) +
    `0${d.getMinutes()}`.slice(-2) +
    `0${d.getSeconds()}`.slice(-2)
  );
}

export function dateString() {
  const d = new Date();
  return (
    `0${d.getUTCDate()}`.slice(-2) +
    "/"+
    `0${d.getUTCMonth() + 1}`.slice(-2) +
    " - "+
    `0${d.getHours()}`.slice(-2) +
    ":"+
    `0${d.getMinutes()}`.slice(-2) +
    ":"+
    `0${d.getSeconds()}`.slice(-2)
  );
}

export function listenerOutput(test, type) {
  test[type] = "";
  return data => (test[type] += data);
}
