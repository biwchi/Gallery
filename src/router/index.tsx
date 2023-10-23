import { BrowserRouter, Route, Routes } from "react-router-dom";

import Media from "@/pages/Media";
import Photos from "@/pages/Photos";
import DefaultLayout from "@/layouts/Default";

// import ProtectedRoute from './ProtectedRoute';

function RoutesRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Media />}></Route>
          <Route path="/photos" element={<Photos />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export const AppRouter = RoutesRouter;
