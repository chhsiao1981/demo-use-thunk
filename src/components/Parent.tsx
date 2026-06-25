import { genID, getState, useThunk } from "@chhsiao1981/use-thunk";
import { type ChangeEvent, useState } from "react";
import * as DoParent from "../thunks/parent";
import * as DoUser from "../thunks/user";
import Child from "./Child";

export default () => {
  const useParent = useThunk<DoParent.State, typeof DoParent>(DoParent);
  const [parent, doParent, parentID] = getState(useParent);

  const useUser = useThunk<DoUser.State, typeof DoUser>(DoUser);
  const [user, doUser, userID] = getState(useUser);

  const [childID0] = useState(() => genID());
  const [childID1] = useState(() => genID());

  const [grandChildID0] = useState(() => genID());
  const [grandChildID1] = useState(() => genID());

  const [grandChildID2] = useState(() => genID());
  const [grandChildID3] = useState(() => genID());

  const onClickIncrease = () => {
    doParent.increase(parentID);
  };

  const onClickDecrease = () => {
    doParent.decrease(parentID);
  };

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target?.value;
    doUser.setName(userID, name);
  };

  console.info("Parent: to render:", parentID);

  return (
    <>
      <p>
        Parent ({parentID}): {parent.count}
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
