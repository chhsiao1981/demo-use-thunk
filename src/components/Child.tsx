import {
  getState,
  type ThunkModuleToFunc,
  useThunk,
} from "@chhsiao1981/use-thunk";
import * as DoChild from "../reducers/child";
import GrandChild from "./GrandChild";

type TDoChild = ThunkModuleToFunc<typeof DoChild>;

type Props = {
  theID: string;
  grandChildID0: string;
  grandChildID1: string;
};

export default (props: Props) => {
  const { theID, grandChildID0, grandChildID1 } = props;

  const useChild = useThunk<DoChild.State, TDoChild>(DoChild);
  const [classState, doChild] = useChild;

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
      <GrandChild theID={grandChildID0} />
      <GrandChild theID={grandChildID1} />
    </>
  );
};
