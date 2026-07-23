import type { State as _State, Thunk } from "use-thunk";
import { MAX_INTERVAL_MS, MIN_INTERVAL_MS } from "../const";

export const name = "demo-use-thunk/child";

export interface State extends _State {
  name: string;
  count: number;
  value: number;
  interval_ms: number;
  abort?: AbortController;
}

export const defaultState: State = {
  name: "",
  count: 1,
  interval_ms: 400,
  value: 0,
};

export const init = (
  id: string,
  count: number,
  interval_ms: number,
): Thunk<State> => {
  return (set) => {
    set(id, { count, interval_ms });
  };
};

export const loop = (id: string): Thunk<State> => {
  return (set, get) => {
    const { interval_ms, abort: preAbort } = get(id);
    if (preAbort) {
      preAbort.abort();
    }

    const abort = new AbortController();
    set(id, { abort });

    const theLoop = setInterval(() => {
      console.info(`child.loop (${id}): now:`, new Date().getMilliseconds());
      const { value, count } = get(id);
      set(id, { value: value + count });
    }, interval_ms);

    abort.signal.addEventListener("abort", () => {
      clearInterval(theLoop);
    });
  };
};

export const increase = (id: string): Thunk<State> => {
  return (set, get) => {
    const state = get(id);
    const { count } = state;
    set(id, { count: count + 1 });
  };
};

export const decrease = (id: string): Thunk<State> => {
  return (set, get) => {
    const state = get(id);
    const { count } = state;
    set(id, { count: count - 1 });
  };
};

export const increaseIntervalMS = (id: string): Thunk<State> => {
  return (set, get) => {
    const { interval_ms } = get(id);
    if (interval_ms >= MAX_INTERVAL_MS) {
      return;
    }
    set(id, { interval_ms: interval_ms + 100 });
    set(loop(id));
  };
};

export const decreaseIntervalMS = (id: string): Thunk<State> => {
  return (set, get) => {
    const { interval_ms } = get(id);
    if (interval_ms < MIN_INTERVAL_MS) {
      return;
    }

    set(id, { interval_ms: interval_ms - 100 });
    set(loop(id));
  };
};
