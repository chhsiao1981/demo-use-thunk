import {
  genUUID,
  getState,
  type ThunkModuleToFunc,
  useThunk,
} from "@chhsiao1981/use-thunk";
import { useEffect, useState } from "react";
import * as DoChild from "../reducers/child";
import GrandChild from "./GrandChild";

type TDoChild = ThunkModuleToFunc<typeof DoChild>;

type Props = {
  theID: string;
  name: string;
};

export default (props: Props) => {
  const { theID, name } = props;

  const useChild = useThunk<DoChild.State, TDoChild>(DoChild);
  const [classState, doChild] = useChild;

  const [grandChildID0, _1] = useState(() => genUUID());
  const [grandChildID1, _2] = useState(() => genUUID());

  useEffect(() => {
    doChild.init(theID, name);
  }, [doChild, theID, name]);

  const me = getState(classState, theID) || DoChild.defaultState;

  const onClickIncrease = () => {
    doChild.increase(theID);
  };

  const onClickDecrease = () => {
    doChild.decrease(theID);
  };

  return (
    <>
      <p>
        Child ({me.name}): {me.count} grandChildren: {me.grandChildren.length}
      </p>
      <button type="button" onClick={onClickIncrease}>
        Child ({me.name}): +
      </button>
      <button type="button" onClick={onClickDecrease}>
        Child ({me.name}): -
      </button>
      <GrandChild theID={grandChildID0} name={`${me.name}-0`} />
      <GrandChild theID={grandChildID1} name={`${me.name}-1`} />
    </>
  );
};
