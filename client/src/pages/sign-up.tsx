import { useState } from "react";
import { authClient } from "../lib/auth-client";
import { useNavigate, Navigate, Link } from "react-router";

export default function Signup() {
    const { data, isPending } = authClient.useSession();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        await authClient.signUp.email(
            { name: name, email: email, password: password },
            {
                onError(ctx) {
                    alert("Error is sign up");
                    console.error(ctx.error.message);
                },
                onSuccess(ctx) {
                    console.log("Sign up success");
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
        <div className="h-screen flex justify-center items-center flex-col gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h1 className="text-xl font-medium">Sign up</h1>
                <input
                    required
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    className="p-1 border"
                />

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
                    {loading ? "Loading..." : "Sign up"}
                </button>
            </form>

            <Link className="cursor-pointer underline font-medium" to="/login">Already have account? Login</Link>

        </div>
    );
}
