import type { State as _State, Thunk } from "use-thunk";

export const name = "demo-use-thunk/grand-child";

export interface State extends _State {
  count: number;
}

export const defaultState: State = {
  count: 0,
};

export const increase = (myID: string): Thunk<State> => {
  return (set, get) => {
    const state = get(myID);
    const { count } = state;
    set(myID, { count: count + 1 });
  };
};

export const decrease = (myID: string): Thunk<State> => {
  return (set, get) => {
    const state = get(myID);
    const { count } = state;
    set(myID, { count: count - 1 });
  };
};
