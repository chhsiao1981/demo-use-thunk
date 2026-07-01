import { useThunk } from "@chhsiao1981/use-thunk";
import githubLogo from "./assets/github.svg";
import styles from "./Header.module.css";
import * as ModUser from "./thunks/user";

export default () => {
  const [user] = useThunk<ModUser.State, typeof ModUser>(ModUser);
  const username = user.name || "my friend";
  return (
    <div className={styles.root}>
      <span className={styles.username}>Hi～ {username}～</span>
      <a
        href="https://github.com/chhsiao1981/demo-use-thunk"
        className={styles.github}
      >
        <img aria-label="github logo" src={githubLogo} />
      </a>
    </div>
  );
};
