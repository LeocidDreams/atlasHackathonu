import { Outlet } from "react-router";
import { Footer } from "@layouts/home/components/footer";
import { Header } from "@layouts/home/components/header";
import { CampusOpsLayout } from "../campus-ops";

export default function HomeLayout() {
  return (
    <CampusOpsLayout>
      <div className="flex min-h-svh flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </CampusOpsLayout>
  );
}
