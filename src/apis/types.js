// @flow
type State = {
  +auth: {
    +username: string,
    +token: string,
    +success: boolean,
    +refreshToken: string,
    +key: string,
    +text: string
  },
  +appState: {
    +hasError: boolean,
    +errorMessage: string,
    +lastResponse: string
  }
};

type Action = {
  +type: string,
  +payload?: mixed
};

type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => State;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;

export type { Dispatch, GetState, ThunkAction, PromiseAction, State, Action };

//Actions
