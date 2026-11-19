import "@/App.css";
import { RouterProvider } from "react-router";
import router from "@/router";
import { BaseProvider } from "./provider/base-provider";

function App() {
  return (
    <BaseProvider>
      <RouterProvider router={router} />
    </BaseProvider>
  );
}

export default App;
