// @flow
import R from "ramda";
import { LOGIN, WRONG_LOGIN } from "actions/auth.js";

// const processLogin = (state: mixed, payload: mixed): mixed => {
//   const updateUser = R.mergeLeft(payload);
//   return R.evolve({
//     user: updateUser,
//   })(state);
// };

const initialState = {
  username: "",
  password: "",
  token: ""
};
// authentication reducer
function auth(
  state: mixed = initialState,
  action: { type: string, payload?: any }
) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
    case WRONG_LOGIN:
      return R.mergeLeft(payload, state);

    default:
      return state;
  }
}

export default auth;
