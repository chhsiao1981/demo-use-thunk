import type { State as _State, Thunk } from "use-thunk";
import { MAX_INTERVAL_MS, MIN_INTERVAL_MS } from "../const";

export const name = "demo-use-thunk/parent";

export interface State extends _State {
  count: number;
  value: number;
  interval_ms: number;
  abort?: AbortController;
}

export const defaultState: State = {
  count: 1,
  interval_ms: 400,
  value: 0,
};

export const loop = (): Thunk<State> => {
  return (set, get) => {
    const { interval_ms, abort: preAbort } = get();
    if (preAbort) {
      preAbort.abort();
    }

    const abort = new AbortController();
    set(null, { abort });

    const theLoop = setInterval(() => {
      console.info("parent.loop: now:", new Date().getMilliseconds());
      const { value, count } = get();
      set(null, { value: value + count });
    }, interval_ms);

    abort.signal.addEventListener("abort", () => {
      clearInterval(theLoop);
    });
  };
};

export const increase = (): Thunk<State> => {
  return (set, get) => {
    const { count } = get();
    set(null, { count: count + 1 });
  };
};

export const decrease = (): Thunk<State> => {
  return (set, get) => {
    const { count } = get();
    set(null, { count: count - 1 });
  };
};

export const increaseIntervalMS = (): Thunk<State> => {
  return (set, get) => {
    const { interval_ms } = get();
    if (interval_ms >= MAX_INTERVAL_MS) {
      return;
    }
    set(null, { interval_ms: interval_ms + 100 });
    set(loop());
  };
};

export const decreaseIntervalMS = (): Thunk<State> => {
  return (set, get) => {
    const { interval_ms } = get();
    if (interval_ms < MIN_INTERVAL_MS) {
      return;
    }

    set(null, { interval_ms: interval_ms - 100 });
    set(loop());
  };
};
