import {
  genID,
  getState,
  type toDoModule,
  useThunk,
} from "@chhsiao1981/use-thunk";
import { type ChangeEvent, useState } from "react";
import * as DoParent from "../thunks/parent";
import * as DoUser from "../thunks/user";
import Child from "./Child";

type TDoParent = toDoModule<typeof DoParent>;
type TDoUser = toDoModule<typeof DoUser>;

// biome-ignore lint/complexity/noBannedTypes: Props is a required type.
type Props = {};

export default (_props: Props) => {
  const useParent = useThunk<DoParent.State, TDoParent>(DoParent);
  const [parent, doParent, parentID] = getState(useParent);

  const useUser = useThunk<DoUser.State, TDoUser>(DoUser);
  const [user, doUser, userID] = getState(useUser);

  const [childID0, _1] = useState(() => genID());
  const [childID1, _2] = useState(() => genID());

  const [grandChildID0, _3] = useState(() => genID());
  const [grandChildID1, _4] = useState(() => genID());

  const [grandChildID2, _5] = useState(() => genID());
  const [grandChildID3, _6] = useState(() => genID());

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
