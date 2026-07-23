import { memo } from "react";
import { useThunk } from "use-thunk";
import * as ModGrandChild from "../thunks/grandChild";
import * as ModUser from "../thunks/user";

type Props = {
  theID: string;
};

export default memo((props: Props) => {
  const { theID } = props;

  const [grandChild, doGrandChild] = useThunk<
    ModGrandChild.State,
    typeof ModGrandChild
  >(ModGrandChild, theID);

  const [user] = useThunk<ModUser.State, typeof ModUser>(ModUser);

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
        GrandChild ({theID}): {grandChild.count} my name: {user.name}
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
