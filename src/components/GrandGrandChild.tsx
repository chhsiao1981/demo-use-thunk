import { memo } from "react";
import type * as ModGrandChild from "../thunks/grandChild";

type Props = {
  grandChildID: string;
  grandChild: ModGrandChild.State;
};

export default memo((props: Props) => {
  const { grandChildID, grandChild } = props;

  console.info("GrandGrandChild: to render:", grandChildID);
  return (
    <p>
      GrandGrandChild from {grandChildID}: count: {grandChild.count}
    </p>
  );
});
