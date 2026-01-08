import {
  getState,
  type ThunkModuleToFunc,
  type UseThunk,
} from "@chhsiao1981/use-thunk";
import * as DoGrandChild from "../reducers/grandChild";

type TDoGrandChild = ThunkModuleToFunc<typeof DoGrandChild>;

type Props = {
  theID: string;
  useGrandChild: UseThunk<DoGrandChild.State, TDoGrandChild>;
};

export default (props: Props) => {
  const { theID, useGrandChild } = props;
  const [classState, doGrandChild] = useGrandChild;

  const me = getState(classState, theID) || DoGrandChild.defaultState;

  const onClickIncrease = () => {
    doGrandChild.increase(theID);
  };

  const onClickDecrease = () => {
    doGrandChild.decrease(theID);
  };

  return (
    <>
      <p>
        GrandChild ({me.name}): {me.count}
      </p>
      <button type="button" onClick={onClickIncrease}>
        GrandChild ({me.name}): +
      </button>
      <button type="button" onClick={onClickDecrease}>
        GrandChild ({me.name}): -
      </button>
    </>
  );
};
