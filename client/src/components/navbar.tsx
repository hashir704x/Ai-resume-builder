import { Link } from "react-router";
import { authClient } from "../lib/auth-client";

export default function Navbar() {
    const { isPending, data } = authClient.useSession();
    return (
        <nav className="p-4 border flex justify-end">
            {isPending ? (
                <div className="font-medium">Loading...</div>
            ) : (
                <div className="flex items-center gap-10">
                    <Link to="/">Landing</Link>
                    <Link to="/about">About</Link>
                    {data ? (
                        <div className="flex items-center gap-8">
                            <Link to="/protected">Dashboard</Link>
                            <button
                                onClick={() => authClient.signOut()}
                                className="text-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="text-red-600">
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}
