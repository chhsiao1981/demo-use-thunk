import { genID, useThunk } from "@chhsiao1981/use-thunk";
import { type ChangeEvent, useEffect, useState } from "react";
import { MAX_INTERVAL_MS, MIN_INTERVAL_MS } from "../const";
import * as ModParent from "../thunks/parent";
import * as ModUser from "../thunks/user";
import Child from "./Child";

export default () => {
  const [parent, doParent, parentID] = useThunk<
    ModParent.State,
    typeof ModParent
  >(ModParent);
  const { count, value, interval_ms } = parent;

  const [user, doUser] = useThunk<ModUser.State, typeof ModUser>(ModUser);

  const [childID0] = useState(() => genID());
  const [childID1] = useState(() => genID());

  const [grandChildID0] = useState(() => genID());
  const [grandChildID1] = useState(() => genID());

  const [grandChildID2] = useState(() => genID());
  const [grandChildID3] = useState(() => genID());

  useEffect(() => {
    console.info("Parent (init): to doParent.loop");
    doParent.loop();
  }, [doParent.loop]);

  const onClickIncrease = () => {
    doParent.increase();
  };

  const onClickDecrease = () => {
    doParent.decrease();
  };

  const onClickIncreaseIntervalMS = () => {
    doParent.increaseIntervalMS();
  };

  const onClickDecreaseIntervalMS = () => {
    doParent.decreaseIntervalMS();
  };

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target?.value;
    doUser.setName(name);
  };

  console.info("Parent: to render:", parentID);

  return (
    <>
      <hr />
      <p>
        Parent ({parentID}): (count: {count} value: {value}, interval (ms):{" "}
        {interval_ms})
      </p>
      <div>
        <label>
          My name:
          <input type="text" onChange={onChangeUsername} value={user.name} />
        </label>
        <button type="button" onClick={onClickIncrease}>
          Parent: count +
        </button>
        <button type="button" onClick={onClickDecrease}>
          Parent: count -
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={onClickIncreaseIntervalMS}
          disabled={interval_ms >= MAX_INTERVAL_MS}
        >
          Parent: interval +100
        </button>
        <button
          type="button"
          onClick={onClickDecreaseIntervalMS}
          disabled={interval_ms <= MIN_INTERVAL_MS}
        >
          Parent: interval -100
        </button>
      </div>
      <Child
        id={childID0}
        grandChildID0={grandChildID0}
        grandChildID1={grandChildID1}
      />
      <Child
        id={childID1}
        grandChildID0={grandChildID2}
        grandChildID1={grandChildID3}
      />
    </>
  );
};
