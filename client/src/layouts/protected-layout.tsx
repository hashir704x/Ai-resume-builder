import { Outlet } from "react-router";
import { Navigate } from "react-router";
import { authClient } from "../lib/auth-client";
import Navbar from "../components/navbar";

export default function ProtectedLayout() {
    const { isPending, data, error } = authClient.useSession();
    if (isPending)
        return (
            <div className="flex justify-center items-center h-[90vh]">
                <h1 className="text-3xl font-bold">Loading</h1>
            </div>
        );
    if (error)
        return (
            <div className="flex flex-col justify-center items-center h-[90vh]">
                <h1 className="text-3xl font-bold text-red-500">Error</h1>

                <p className="text-center my-2">{error.message}</p>
            </div>
        );
    if (!data) return <Navigate to="/login" replace={true} />;
    return (
        <main>
            <Navbar />
            <Outlet />
        </main>
    );
}
