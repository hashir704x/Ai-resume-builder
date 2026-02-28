import { Link } from "react-router";
import { authClient } from "../lib/auth-client";

export default function Navbar() {
    const { isPending, data } = authClient.useSession();
    return (
        <nav className="p-4 border-2 flex justify-end">
            {isPending ? (
                <div className="font-medium">Loading...</div>
            ) : (
                <div>
                    {data ? (
                        <div>
                            <span>Hello, {data.user.name}</span>
                            <button>logout</button>
                        </div>
                    ) : (
                        <div>
                            <Link to="/login">Login</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
