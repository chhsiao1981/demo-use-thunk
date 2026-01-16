import {
  genUUID,
  getRootID,
  getState,
  type ThunkModuleToFunc,
  useThunk,
} from "@chhsiao1981/use-thunk";
import { type ChangeEvent, useEffect, useState } from "react";
import * as DoChild from "../reducers/child";
import * as DoGrandChild from "../reducers/grandChild";
import * as DoParent from "../reducers/parent";
import * as DoUser from "../reducers/user";
import Child from "./Child";

type TDoParent = ThunkModuleToFunc<typeof DoParent>;
type TDoChild = ThunkModuleToFunc<typeof DoChild>;
type TDoGrandChild = ThunkModuleToFunc<typeof DoGrandChild>;
type TDoUser = ThunkModuleToFunc<typeof DoUser>;

// biome-ignore lint/complexity/noBannedTypes: Props is a required type.
type Props = {};

export default (_props: Props) => {
  const useParent = useThunk<DoParent.State, TDoParent>(DoParent);
  const [classStateParent, doParent] = useParent;

  const useChild = useThunk<DoChild.State, TDoChild>(DoChild);
  const [_7, doChild] = useChild;

  const useGrandChild = useThunk<DoGrandChild.State, TDoGrandChild>(
    DoGrandChild,
  );
  const [_8, doGrandChild] = useGrandChild;

  const useUser = useThunk<DoUser.State, TDoUser>(DoUser);
  const [classStateUser, doUser] = useUser;

  const [childID0, _1] = useState(() => genUUID());
  const [childID1, _2] = useState(() => genUUID());

  const [grandChildID0, _3] = useState(() => genUUID());
  const [grandChildID1, _4] = useState(() => genUUID());

  const [grandChildID2, _5] = useState(() => genUUID());
  const [grandChildID3, _6] = useState(() => genUUID());

  useEffect(() => {
    if (!childID0) {
      return;
    }
    if (!childID1) {
      return;
    }
    doParent.init();
    doChild.init(childID0, "0");
    doChild.init(childID1, "1");

    doGrandChild.init(grandChildID0, "0-0");
    doGrandChild.init(grandChildID1, "0-1");
    doGrandChild.init(grandChildID2, "1-0");
    doGrandChild.init(grandChildID3, "1-1");

    doUser.init();
  }, [
    doParent,
    doChild,
    childID0,
    childID1,
    doGrandChild,
    grandChildID0,
    grandChildID1,
    grandChildID2,
    grandChildID3,
    doUser,
  ]);

  const me = getState(classStateParent) || DoParent.defaultState;
  const myID = getRootID(classStateParent);

  const user = getState(classStateUser) || DoUser.defaultState;
  const userID = getRootID(classStateUser);

  const onClickIncrease = () => {
    doParent.increase(myID);
  };

  const onClickDecrease = () => {
    doParent.decrease(myID);
  };

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target?.value;
    doUser.setName(userID, name);
  };

  return (
    <>
      <p>
        Parent: {me.count} children: {me.children.length}
      </p>
      <label>
        username:
        <input type="text" onChange={onChangeUsername} value={user.name} />
      </label>
      <button type="button" onClick={onClickIncrease}>
        Parent: +
      </button>
      <button type="button" onClick={onClickDecrease}>
        Parent: -
      </button>
      <hr />
      <Child
        theID={childID0}
        grandChildID0={grandChildID0}
        grandChildID1={grandChildID1}
      />
      <Child
        theID={childID1}
        grandChildID0={grandChildID2}
        grandChildID1={grandChildID3}
      />
    </>
  );
};
