import { RouterProvider } from "react-router";
import router from "@/router";
import { BaseProvider } from "@provider/base-provider";
import { Toaster } from "@components/ui/sonner";

function App() {
  return (
    <BaseProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" duration={5000} />
    </BaseProvider>
  );
}

export default App;
