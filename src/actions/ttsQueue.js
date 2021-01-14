//@flow

const ADD_MESSAGE = "ADD_MESSAGE"
const addMessage = (msg:string) => ({
  type: ADD_MESSAGE,
  payload: msg,
})

const ADD_ALARM = "ADD_ALARM"
const addAlarm = (msg:string) => ({
  type: ADD_ALARM,
  payload: msg,
})

const CLEAR_MESSAGE = "CLEAR_MESSAGE"
const clearMessage = ()=>({
  type:CLEAR_MESSAGE,
})

const CLEAR_ALARM = "CLEAR_ALARM"
const clearAlarm = ()=>({
  type:CLEAR_ALARM,
})

const PICK_MESSAGE = "PICK_MESSAGE"
const pickMessage = ()=>({
  type:PICK_MESSAGE,
}) 

const PICK_ALARM = "PICK_ALARM"
const pickAlarm = ()=>({
  type:PICK_ALARM,
})


export {
  ADD_MESSAGE,
  addMessage,
  ADD_ALARM,
  addAlarm,
  CLEAR_MESSAGE,
  clearMessage,
  CLEAR_ALARM,
  clearAlarm,
  PICK_ALARM,
  pickAlarm,
  PICK_MESSAGE,
  pickMessage
};