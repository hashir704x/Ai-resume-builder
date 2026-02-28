import { createBrowserRouter, RouterProvider } from "react-router";
import Landing from "./pages/landing";
import Signup from "./pages/sign-up";
import Login from "./pages/login";
import Layout from "./layouts/layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Landing /> },
            { path: "/sign-up", element: <Signup /> },
            { path: "/login", element: <Login /> },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
