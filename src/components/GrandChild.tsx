import { getState, useThunk } from "@chhsiao1981/use-thunk";
import { memo } from "react";
import * as DoGrandChild from "../thunks/grandChild";
import * as DoUser from "../thunks/user";

type Props = {
  theID: string;
};

export default memo((props: Props) => {
  const { theID } = props;

  const useGrandChild = useThunk<DoGrandChild.State, typeof DoGrandChild>(
    DoGrandChild,
  );
  const [grandChild, doGrandChild] = getState(useGrandChild, theID);

  const useUser = useThunk<DoUser.State, typeof DoUser>(DoUser);
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
