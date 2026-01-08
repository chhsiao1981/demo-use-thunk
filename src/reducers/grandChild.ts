import {
  init as _init,
  getState,
  type State as rState,
  setData,
  type Thunk,
} from "@chhsiao1981/use-thunk";

export const myClass = "demo-use-thunk/grand-child";

export interface State extends rState {
  name: string;
  count: number;
}

export const defaultState: State = {
  name: "",
  count: 0,
};

export const init = (myID: string, name: string): Thunk<State> => {
  return (dispatch, _) => {
    const state: State = Object.assign({}, defaultState, { name });
    dispatch(_init({ myID, state }));
  };
};

export const increase = (myID: string): Thunk<State> => {
  return (dispatch, getClassState) => {
    const classState = getClassState();
    const state = getState(classState, myID);
    if (!state) {
      return;
    }
    const { count } = state;
    dispatch(setData(myID, { count: count + 1 }));
  };
};

export const decrease = (myID: string): Thunk<State> => {
  return (dispatch, getClassState) => {
    const classState = getClassState();
    const state = getState(classState, myID);
    if (!state) {
      return;
    }
    const { count } = state;
    dispatch(setData(myID, { count: count - 1 }));
  };
};
