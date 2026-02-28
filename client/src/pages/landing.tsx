import { Link } from "react-router";
import { authClient } from "../lib/auth-client";

export default function Landing() {
    // const { data, isPending } = authClient.useSession();
    // console.log(data);
    return (
        <div>
            {/* <div className="border-2 p-4">
                {isPending ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        {data ? (
                            <div>
                                <button onClick={() => authClient.signOut()}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div>
                                <Link to="/login" className="underline cursor-pointer">
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div>
                <h1 className="text-center text-3xl mt-20">Landing Page</h1>
            </div> */}
        </div>
    );
}
