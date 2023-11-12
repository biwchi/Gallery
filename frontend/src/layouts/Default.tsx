import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

export default function DefaultLayout() {
  return (
    <div className="max-w-screen-xl m-auto px-4">
      <Header />
      <Outlet />
    </div>
  );
}
