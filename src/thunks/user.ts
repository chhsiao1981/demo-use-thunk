import type { State as rState, Thunk } from "@chhsiao1981/use-thunk";

export const name = "demo-use-thunk/user";

export interface State extends rState {
  name: string;
}

export const defaultState: State = {
  name: "",
};

export const setName = (name: string): Thunk<State> => {
  return (set) => {
    set(null, { name });
  };
};
