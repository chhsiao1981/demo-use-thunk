import {
  getState,
  type ThunkModuleToFunc,
  type UseThunk,
} from "@chhsiao1981/use-thunk";
import * as DoChild from "../reducers/child";
import type * as DoGrandChild from "../reducers/grandChild";
import GrandChild from "./GrandChild";

type TDoChild = ThunkModuleToFunc<typeof DoChild>;
type TDoGrandChild = ThunkModuleToFunc<typeof DoGrandChild>;

type Props = {
  theID: string;
  useChild: UseThunk<DoChild.State, TDoChild>;
  useGrandChild: UseThunk<DoGrandChild.State, TDoGrandChild>;
};

export default (props: Props) => {
  const { theID, useChild, useGrandChild } = props;
  const [classState, doChild] = useChild;

  const me = getState(classState, theID) || DoChild.defaultState;

  const onClickIncrease = () => {
    doChild.increase(theID);
  };

  const onClickDecrease = () => {
    doChild.decrease(theID);
  };

  const onClickAddGrandChild = () => {
    doChild.addGrandChild(theID);
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
      <button type="button" onClick={onClickAddGrandChild}>
        Child ({me.name}): + grandChild
      </button>
      {me.grandChildren.map((each, idx) => (
        <GrandChild
          key={`grandchild-${me.name}-${idx}`}
          theID={each}
          useGrandChild={useGrandChild}
        />
      ))}
    </>
  );
};
