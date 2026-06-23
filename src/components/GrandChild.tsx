import { getState, type toDoModule, useThunk } from "@chhsiao1981/use-thunk";
import { memo } from "react";
import * as DoGrandChild from "../thunks/grandChild";
import * as DoUser from "../thunks/user";

type TDoGrandChild = toDoModule<typeof DoGrandChild>;
type TDoUser = toDoModule<typeof DoUser>;

type Props = {
  theID: string;
};

export default memo((props: Props) => {
  const { theID } = props;

  const useGrandChild = useThunk<DoGrandChild.State, TDoGrandChild>(
    DoGrandChild,
  );
  const [grandChild, doGrandChild] = getState(useGrandChild, theID);

  const useUser = useThunk<DoUser.State, TDoUser>(DoUser);
  const [user] = getState(useUser);

  const onClickIncrease = () => {
    doGrandChild.increase(theID);
  };

  const onClickDecrease = () => {
    doGrandChild.decrease(theID);
  };

  console.info("GrandChild: to render:", theID);

  return (
    <>
      <p>
        GrandChild ({theID}): {grandChild.count} username: {user.name}
      </p>
      <button type="button" onClick={onClickIncrease}>
        GrandChild ({theID}): +
      </button>
      <button type="button" onClick={onClickDecrease}>
        GrandChild ({theID}): -
      </button>
    </>
  );
});
