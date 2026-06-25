import { registerThunk, ThunkContext } from "@chhsiao1981/use-thunk";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Parent from "./components/Parent.tsx";
import * as ModChild from "./thunks/child.ts";
import * as ModGrandChild from "./thunks/grandChild.ts";
import * as ModParent from "./thunks/parent.ts";
import * as ModUser from "./thunks/user.ts";

registerThunk(ModParent);
registerThunk(ModChild);
registerThunk(ModGrandChild);
registerThunk(ModUser);
console.info("after registerThunk");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThunkContext>
      <App />
      <Parent />
    </ThunkContext>
  </StrictMode>,
);
