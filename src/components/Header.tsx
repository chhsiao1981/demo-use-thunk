import { useThunk } from "use-thunk";
import githubLogo from "../assets/github.svg";
import * as ModUser from "../thunks/user";
import styles from "./Header.module.css";

export default () => {
  const [user] = useThunk<ModUser.State, typeof ModUser>(ModUser);
  const username = user.name || "my friend";
  return (
    <div className={styles.root}>
      <span className={styles.username}>Hi～ {username}～</span>
      <a
        className={styles["tic-tac-toe"]}
        href="https://chhsiao1981.github.io/demo-use-thunk-tic-tac-toe/"
      >
        tic-tac-toe
      </a>
      <a
        href="https://github.com/chhsiao1981/demo-use-thunk"
        className={styles.github}
      >
        <img aria-label="github logo" src={githubLogo} />
      </a>
    </div>
  );
};
