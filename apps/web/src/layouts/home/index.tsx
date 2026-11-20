import { Outlet } from "react-router";
import { Footer } from "@layouts/home/components/footer";
import { Header } from "@layouts/home/components/header";

export default function HomeLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
