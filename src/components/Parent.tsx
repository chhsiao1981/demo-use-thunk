import { genID, useThunk } from "@chhsiao1981/use-thunk";
import { type ChangeEvent, useState } from "react";
import * as ModParent from "../thunks/parent";
import * as ModUser from "../thunks/user";
import Child from "./Child";

export default () => {
  const [parent, doParent, parentID] = useThunk<
    ModParent.State,
    typeof ModParent
  >(ModParent);

  const [user, doUser] = useThunk<ModUser.State, typeof ModUser>(ModUser);

  const [childID0] = useState(() => genID());
  const [childID1] = useState(() => genID());

  const [grandChildID0] = useState(() => genID());
  const [grandChildID1] = useState(() => genID());

  const [grandChildID2] = useState(() => genID());
  const [grandChildID3] = useState(() => genID());

  const onClickIncrease = () => {
    doParent.increase();
  };

  const onClickDecrease = () => {
    doParent.decrease();
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
        Parent ({parentID}): {parent.count}
      </p>
      <label>
        My name:
        <input type="text" onChange={onChangeUsername} value={user.name} />
      </label>
      <button type="button" onClick={onClickIncrease}>
        Parent: +
      </button>
      <button type="button" onClick={onClickDecrease}>
        Parent: -
      </button>
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
