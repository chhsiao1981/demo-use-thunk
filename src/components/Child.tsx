import { memo, useEffect } from "react";
import { useThunk } from "use-thunk";
import { MAX_INTERVAL_MS, MIN_INTERVAL_MS } from "../const";
import * as ModChild from "../thunks/child";
import { rand09 } from "../utils";
import GrandChild from "./GrandChild";

type Props = {
  id: string;
  grandChildID0: string;
  grandChildID1: string;
};

export default memo((props: Props) => {
  const { id, grandChildID0, grandChildID1 } = props;

  const [child, doChild] = useThunk<ModChild.State, typeof ModChild>(
    ModChild,
    id,
  );
  const { count, value, interval_ms } = child;

  // biome-ignore lint/correctness/useExhaustiveDependencies: doChild.upsert and theID are const.
  useEffect(() => {
    const count = rand09() + 1;
    const interval_ms = (rand09() + 1) * 100;
    doChild.init(id, count, interval_ms);
    doChild.upsert(id, { name: `child-${id}` });
    doChild.loop(id);
  }, []);

  const onClickIncrease = () => {
    doChild.increase(id);
  };

  const onClickDecrease = () => {
    doChild.decrease(id);
  };

  const onClickIncreaseIntervalMS = () => {
    doChild.increaseIntervalMS(id);
  };

  const onClickDecreaseIntervalMS = () => {
    doChild.decreaseIntervalMS(id);
  };

  console.info("Child: to render:", id);

  return (
    <>
      <p>
        Child ({child.name}): (count: {count} value: {value} interval (ms):{" "}
        {interval_ms})
      </p>
      <div>
        <button type="button" onClick={onClickIncrease}>
          Child ({id}): +
        </button>
        <button type="button" onClick={onClickDecrease}>
          Child ({id}): -
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={onClickIncreaseIntervalMS}
          disabled={interval_ms >= MAX_INTERVAL_MS}
        >
          Child ({id}): interval +100
        </button>
        <button
          type="button"
          onClick={onClickDecreaseIntervalMS}
          disabled={interval_ms <= MIN_INTERVAL_MS}
        >
          Child ({id}): interval -100
        </button>
      </div>
      <GrandChild theID={grandChildID0} />
      <GrandChild theID={grandChildID1} />
    </>
  );
});
