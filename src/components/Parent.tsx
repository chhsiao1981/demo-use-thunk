import {
  genUUID,
  getRootID,
  getState,
  type ThunkModuleToFunc,
  useThunk,
} from "@chhsiao1981/use-thunk";
import { useEffect, useState } from "react";
import * as DoParent from "../reducers/parent";
import Child from "./Child";

type TDoParent = ThunkModuleToFunc<typeof DoParent>;

type Props = {};

export default (props: Props) => {
  const useParent = useThunk<DoParent.State, TDoParent>(DoParent);
  const [classStateParent, doParent] = useParent;

  const [childID0, _1] = useState(() => genUUID());
  const [childID1, _2] = useState(() => genUUID());

  useEffect(() => {
    doParent.init();
  }, [doParent]);

  const me = getState(classStateParent) || DoParent.defaultState;
  const myID = getRootID(classStateParent);

  const onClickIncrease = () => {
    doParent.increase(myID);
  };

  const onClickDecrease = () => {
    doParent.decrease(myID);
  };

  return (
    <>
      <p>
        Parent: {me.count} children: {me.children.length}
      </p>
      <button type="button" onClick={onClickIncrease}>
        Parent: +
      </button>
      <button type="button" onClick={onClickDecrease}>
        Parent: -
      </button>
      <hr />
      <Child theID={childID0} name={"0"} />
      <Child theID={childID1} name={"1"} />
    </>
  );
};
