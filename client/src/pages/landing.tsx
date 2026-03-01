import { Link } from "react-router";
import { authClient } from "../lib/auth-client";

export default function Landing() {
    const { data, isPending } = authClient.useSession();
    return (
        <div>
            <div className="flex justify-end p-3">
                {isPending ? (
                    <span className="font-medium">loading</span>
                ) : (
                    <Link to={data ? "/protected" : "/login"} className="p-2 bg-black text-white rounded-md">
                        {data ? "Dashboard" : "Login"}
                    </Link>
                )}
            </div>

            <h1 className="text-center text-4xl mt-16">Landing Page</h1>
        </div>
    );
}
