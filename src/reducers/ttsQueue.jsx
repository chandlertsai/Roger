import * as A from "actions/ttsQueue"
import R from "ramda";

const initialState = {
  messageQueue: [],
  alarmQueue: [],
  lastPickMessage: ""
};
const MAX = 10;

const ttsQueue = (state: State = initialState, action: Action) => {
  const { type, payload } = action;
  switch(type) {
    case A.ADD_ALARM:
      return Object.assign({},state,{alarmQueue:R.append(payload)(state.alarmQueue)})
    case A.ADD_MESSAGE:
      return Object.assign({},state,{messageQueue:R.append(payload)(R.propOr([],"messageQueue"))})
    case A.CLEAR_MESSAGE:
      return Object.assign({},state,{messageQueue:[]})
    case A.CLEAR_ALARM:
      return Object.assign({},state,{alarmQueue:[]})
  }
  return state;
};
export default ttsQueue;