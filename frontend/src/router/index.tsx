import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Media } from "@/pages/Media";
import { DefaultLayout } from "@/layouts/Default";

function RoutesRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Media />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export const AppRouter = RoutesRouter;
