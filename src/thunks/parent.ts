import type { State as _State, Thunk } from "@chhsiao1981/use-thunk";

export const name = "demo-use-thunk/parent";

export interface State extends _State {
  count: number;
}

export const defaultState: State = {
  count: 0,
};

export const increase = (): Thunk<State> => {
  return (set, get) => {
    const state = get();
    const { count } = state;
    set(null, { count: count + 1 });
  };
};

export const decrease = (): Thunk<State> => {
  return (set, get) => {
    const state = get();
    const { count } = state;
    set(null, { count: count - 1 });
  };
};
