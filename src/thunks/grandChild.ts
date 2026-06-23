import type { State as rState, Thunk } from "@chhsiao1981/use-thunk";

export const name = "demo-use-thunk/grand-child";

export interface State extends rState {
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
