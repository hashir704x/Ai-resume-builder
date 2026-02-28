import { useState } from "react";
import { authClient } from "../lib/auth-client";

export default function Signup() {
    const { isPending, data } = authClient.useSession();
    console.log("session ", isPending, data);

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
    return (
        <div className="h-screen flex justify-center items-center">
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
        </div>
    );
}
