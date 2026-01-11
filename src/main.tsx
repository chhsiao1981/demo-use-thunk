import { registerThunk, ThunkContext } from "@chhsiao1981/use-thunk";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import * as DoChild from "./reducers/child";
import * as DoGrandChild from "./reducers/grandChild";
import * as DoParent from "./reducers/parent";

registerThunk(DoParent);
registerThunk(DoChild);
registerThunk(DoGrandChild);
console.info("after registerThunk");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThunkContext>
      <App />
    </ThunkContext>
  </StrictMode>,
);
