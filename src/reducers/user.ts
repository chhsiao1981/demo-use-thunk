import {
  init as _init,
  type State as rState,
  setData,
  type Thunk,
} from "@chhsiao1981/use-thunk";

export const myClass = "demo-use-thunk/user";

export interface State extends rState {
  name: string;
}

export const defaultState: State = {
  name: "",
};

export const init = (): Thunk<State> => {
  return (dispatch, _) => {
    dispatch(_init({ state: defaultState }));
  };
};

export const setName = (myID: string, name: string): Thunk<State> => {
  return (dispatch, _) => {
    dispatch(setData(myID, { name }));
  };
};
