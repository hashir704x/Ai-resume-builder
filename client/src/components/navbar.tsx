import { Link } from "react-router";
import { authClient } from "../lib/auth-client";

export default function Navbar() {
    const { data } = authClient.useSession();
    return (
        <nav className="p-4 border flex justify-between">
            <span className="font-semibold text-lg">Hello, {data?.user.name}</span>
            <div className="flex items-center gap-8">
                <Link to="/protected">Dashboard</Link>
                <button
                    onClick={() => authClient.signOut()}
                    className="text-red-600 cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
