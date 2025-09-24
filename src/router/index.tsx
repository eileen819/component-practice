import { createBrowserRouter } from "react-router-dom";
import Layout from "components/layout/Layout";
import Home from "pages/Home";
import Day01Demo from "pages/Day01Demo";
import Day02Demo from "pages/Day02Demo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "modal", element: <Day01Demo /> },
      { path: "dropdown", element: <Day02Demo /> },
    ],
  },
]);

export default router;
