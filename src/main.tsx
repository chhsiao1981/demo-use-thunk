import { registerThunk, ThunkContext } from "@chhsiao1981/use-thunk";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import * as DoChild from "./reducers/child";
import * as DoGrandChild from "./reducers/grandChild";
import * as DoParent from "./reducers/parent";
import * as DoUser from "./reducers/user";

// @ts-expect-error registerThunk
registerThunk(DoParent);
// @ts-expect-error registerThunk
registerThunk(DoChild);
// @ts-expect-error registerThunk
registerThunk(DoGrandChild);
// @ts-expect-error registerThunk
registerThunk(DoUser);
console.info("after registerThunk");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThunkContext>
      <App />
    </ThunkContext>
  </StrictMode>,
);
