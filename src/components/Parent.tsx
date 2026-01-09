import {
  getRootID,
  getState,
  type ThunkModuleToFunc,
  type UseThunk,
} from "@chhsiao1981/use-thunk";
import type * as DoChild from "../reducers/child";
import type * as DoGrandChild from "../reducers/grandChild";
import * as DoParent from "../reducers/parent";
import Child from "./Child";

type TDoParent = ThunkModuleToFunc<typeof DoParent>;
type TDoChild = ThunkModuleToFunc<typeof DoChild>;
type TDoGrandChild = ThunkModuleToFunc<typeof DoGrandChild>;

type Props = {
  useParent: UseThunk<DoParent.State, TDoParent>;
  useChild: UseThunk<DoChild.State, TDoChild>;
  useGrandChild: UseThunk<DoGrandChild.State, TDoGrandChild>;
};

export default (props: Props) => {
  const { useParent, useChild, useGrandChild } = props;
  const [classStateParent, doParent] = useParent;

  const me = getState(classStateParent) || DoParent.defaultState;
  const myID = getRootID(classStateParent);

  const onClickIncrease = () => {
    doParent.increase(myID);
  };

  const onClickDecrease = () => {
    doParent.decrease(myID);
  };

  const onClickAddChild = () => {
    doParent.addChild(myID);
  };

  return (
    <>
      <p>
        Parent: {me.count} children: {me.children.length}
      </p>
      <button type="button" onClick={onClickIncrease}>
        Parent: +
      </button>
      <button type="button" onClick={onClickDecrease}>
        Parent: -
      </button>
      <button type="button" onClick={onClickAddChild}>
        Parent: + child
      </button>
      <hr />
      {me.children.map((each, idx) => (
        <Child
          key={`child-${idx}`}
          theID={each}
          useChild={useChild}
          useGrandChild={useGrandChild}
        />
      ))}
    </>
  );
};
