import {
  getState,
  type ThunkModuleToFunc,
  useThunk,
} from "@chhsiao1981/use-thunk";
import * as DoGrandChild from "../reducers/grandChild";

type TDoGrandChild = ThunkModuleToFunc<typeof DoGrandChild>;

type Props = {
  theID: string;
};

export default (props: Props) => {
  const { theID } = props;

  const useGrandChild = useThunk<DoGrandChild.State, TDoGrandChild>(
    DoGrandChild,
  );
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
