import { getState, type toDoModule, useThunk } from "@chhsiao1981/use-thunk";
import { memo, useEffect } from "react";
import * as DoChild from "../thunks/child";
import GrandChild from "./GrandChild";

type TDoChild = toDoModule<typeof DoChild>;

type Props = {
  theID: string;
  grandChildID0: string;
  grandChildID1: string;
};

export default memo((props: Props) => {
  const { theID, grandChildID0, grandChildID1 } = props;

  const useChild = useThunk<DoChild.State, TDoChild>(DoChild);
  const [child, doChild] = getState(useChild, theID);

  // biome-ignore lint/correctness/useExhaustiveDependencies: doChild.upsert and theID are const.
  useEffect(() => {
    doChild.upsert(theID, { name: `child-${theID}` });
  }, []);

  const onClickIncrease = () => {
    doChild.increase(theID);
  };

  const onClickDecrease = () => {
    doChild.decrease(theID);
  };

  console.info("Child: to render:", theID);

  return (
    <>
      <p>
        Child ({child.name}): {child.count}
      </p>
      <button type="button" onClick={onClickIncrease}>
        Child ({theID}): +
      </button>
      <button type="button" onClick={onClickDecrease}>
        Child ({theID}): -
      </button>
      <GrandChild theID={grandChildID0} />
      <GrandChild theID={grandChildID1} />
    </>
  );
});
