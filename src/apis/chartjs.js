// @flow
import R from "ramda";

const transformation = data => ({
  labels: R.map(R.toString)(data),
  datasets: [
    {
      borderColor: "rgba(255,255,255,.55)",
      data
    }
  ]
});

export const transData = (data: Array<Number> | mixed) => {
  // array
  return R.ifElse(R.is(Array), transformation, R.identity)(data);
};
