import {
  getRootID,
  getState,
  type ThunkModuleToFunc,
  useThunk,
} from "@chhsiao1981/use-thunk";
import * as DoGrandChild from "../reducers/grandChild";
import * as DoUser from "../reducers/user";

type TDoGrandChild = ThunkModuleToFunc<typeof DoGrandChild>;
type TDoUser = ThunkModuleToFunc<typeof DoUser>;

type Props = {
  theID: string;
};

export default (props: Props) => {
  const { theID } = props;

  const useGrandChild = useThunk<DoGrandChild.State, TDoGrandChild>(
    DoGrandChild,
  );
  const [classState, doGrandChild] = useGrandChild;

  const useUser = useThunk<DoUser.State, TDoUser>(DoUser);
  const [classStateUser, doUser] = useUser;

  const me = getState(classState, theID) || DoGrandChild.defaultState;

  const user = getState(classStateUser) || DoUser.defaultState;
  const userID = getRootID(classStateUser);

  const onClickIncrease = () => {
    doGrandChild.increase(theID);
  };

  const onClickDecrease = () => {
    doGrandChild.decrease(theID);
  };

  return (
    <>
      <p>
        GrandChild ({me.name}): {me.count} username: {user.name}
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
