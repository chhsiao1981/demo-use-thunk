import {
  init as _init,
  getState,
  type State as rState,
  setData,
  type Thunk,
} from "@chhsiao1981/use-thunk";

export const myClass = "demo-use-thunk/parent";

export interface State extends rState {
  count: number;
  children: string[];
}

export const defaultState: State = {
  count: 0,
  children: [],
};

export const init = (): Thunk<State> => {
  return (dispatch, _) => {
    dispatch(_init({ state: defaultState }));
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
