import { registerThunk, ThunkContext } from "@chhsiao1981/use-thunk";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Parent from "./components/Parent.tsx";
import * as DoChild from "./thunks/child.ts";
import * as DoGrandChild from "./thunks/grandChild.ts";
import * as DoParent from "./thunks/parent.ts";
import * as DoUser from "./thunks/user.ts";

registerThunk(DoParent);
registerThunk(DoChild);
registerThunk(DoGrandChild);
registerThunk(DoUser);
console.info("after registerThunk");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThunkContext>
      <App />
      <Parent />
    </ThunkContext>
  </StrictMode>,
);
