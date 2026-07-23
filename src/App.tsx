import { useState } from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import Parent from "./components/Parent";

export default () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <div className={styles.root}>
        <h1>
          <a href="https://vite.dev/">Vite</a> +{" "}
          <a href="https://react.dev/">React</a> +{" "}
          <a href="https://github.com/chhsiao1981/use-thunk">useThunk</a>
        </h1>
        <div className={styles.card}>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            Component count is {count}
          </button>
        </div>
        <Parent />
      </div>
    </>
  );
};
