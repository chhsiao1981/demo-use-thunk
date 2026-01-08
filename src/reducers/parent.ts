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

import type * as DoChild from "./child";
import type * as DoGrandChild from "./grandChild";

type TDoChild = ThunkModuleToFunc<typeof DoChild>;
type TDoGrandChild = ThunkModuleToFunc<typeof DoGrandChild>;

export const myClass = "demo-use-thunk/parent";

export interface State extends rState {
  count: number;
  children: string[];

  // XXX _useChild is used for internal use only.
  _useChild?: UseThunk<DoChild.State, TDoChild>;
  // XXX _useGrandChild is used for internal use only.
  _useGrandChild?: UseThunk<DoGrandChild.State, TDoGrandChild>;
}

export const defaultState: State = {
  count: 0,
  children: [],
};

export const init = (
  useChild: UseThunk<DoChild.State, TDoChild>,
  useGrandChild: UseThunk<DoGrandChild.State, TDoGrandChild>,
): Thunk<State> => {
  return (dispatch, _) => {
    const update = { _useChild: useChild, _useGrandChild: useGrandChild };
    const state: State = Object.assign({}, defaultState, update);
    dispatch(_init({ state }));
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

export const addChild = (myID: string): Thunk<State> => {
  return (dispatch, getClassState) => {
    const classState = getClassState();
    const state = getState(classState, myID);
    if (!state) {
      return;
    }
    const { _useChild, _useGrandChild, children } = state;
    if (!_useChild || !_useGrandChild) {
      return;
    }

    const newChild = genUUID();
    const newChildren = children.concat([newChild]);
    const [_, doChild] = _useChild;

    doChild.init(newChild, `${children.length}`, _useGrandChild);
    dispatch(setData(myID, { children: newChildren }));
  };
};
