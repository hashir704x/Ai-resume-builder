import { useState } from "react";
import { authClient } from "../lib/auth-client";
import { useNavigate, Navigate, Link } from "react-router";

export default function Login() {
    const { data, isPending } = authClient.useSession();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        await authClient.signIn.email(
            { email: email, password: password },
            {
                onError(ctx) {
                    alert("Error is login");
                    console.error(ctx.error.message);
                },
                onSuccess(ctx) {
                    console.log("Login success");
                    console.log(ctx.data);
                    navigate("/protected");
                },
                onRequest() {
                    setLoading(true);
                },
                onResponse() {
                    setLoading(false);
                },
            },
        );
    }

    if (isPending) return null;
    if (data) return <Navigate to="/protected" replace={true} />;

    return (
        <div className="h-[90vh] flex justify-center items-center flex-col gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h1 className="text-xl font-medium">Login</h1>

                <input
                    required
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="p-1 border"
                />

                <input
                    required
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="p-1 border"
                />

                <button disabled={loading} className="border p-2 cursor-pointer">
                    {loading ? "Loading..." : "Login"}
                </button>
            </form>

            <Link className="cursor-pointer underline font-medium" to="/sign-up">New here? Sign up</Link>
        </div>
    );
}
