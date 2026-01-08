import {
  init as _init,
  genUUID,
  getState,
  type State as rState,
  setData,
  type Thunk,
  type ThunkModuleToFunc,
  type UseThunk,
} from "@chhsiao1981/use-thunk";

import type * as DoGrandChild from "./grandChild";

type TDoGrandChild = ThunkModuleToFunc<typeof DoGrandChild>;

export const myClass = "demo-use-thunk/child";

export interface State extends rState {
  name: string;
  count: number;
  grandChildren: string[];

  // XXX _useGrandChild is used for internal use only.
  _useGrandChild?: UseThunk<DoGrandChild.State, TDoGrandChild>;
}

export const defaultState: State = {
  name: "",
  count: 0,
  grandChildren: [],
};

export const init = (
  myID: string,
  name: string,
  useGrandChild: UseThunk<DoGrandChild.State, TDoGrandChild>,
): Thunk<State> => {
  return (dispatch, _) => {
    const update = { name, _useGrandChild: useGrandChild };
    const state: State = Object.assign({}, defaultState, update);
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

export const addGrandChild = (myID: string): Thunk<State> => {
  return (dispatch, getClassState) => {
    const classState = getClassState();
    const state = getState(classState, myID);
    if (!state) {
      return;
    }
    const { _useGrandChild, grandChildren, name } = state;
    if (!_useGrandChild) {
      return;
    }

    const newGrandChild = genUUID();
    const newGrandChildren = grandChildren.concat([newGrandChild]);
    const [_, doGrandChild] = _useGrandChild;

    doGrandChild.init(newGrandChild, `${name}-${grandChildren.length}`);
    dispatch(setData(myID, { grandChildren: newGrandChildren }));
  };
};
