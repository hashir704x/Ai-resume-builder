import { createBrowserRouter, RouterProvider } from "react-router";
import Landing from "./pages/landing";
import Signup from "./pages/sign-up";
import Login from "./pages/login";
import Layout from "./layouts/layout";
import About from "./pages/about";
import ProtectedLayout from "./layouts/protected-layout";
import Dashboard from "./pages/dashboard";
import Builder from "./pages/builder";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Landing /> },
            { path: "sign-up", element: <Signup /> },
            { path: "login", element: <Login /> },
            { path: "about", element: <About /> },
            {
                path: "protected",
                element: <ProtectedLayout />,
                children: [
                    { index: true, element: <Dashboard /> },
                    { path: "builder", element: <Builder /> },
                ],
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
