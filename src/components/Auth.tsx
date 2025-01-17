
import Turnstile from 'react-turnstile';
import supabase from '../hooks/supabase'
import { useState } from "react";

const isLocalhost = (): boolean => {
    return window.location.hostname === "localhost";
};

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [turnstileSuccess, setTurnstileSuccess] = useState(true);

    const handleLogin = async () => {
        if (!turnstileSuccess) return

        if (!email || !password) return;

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        console.log(data, error);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-50">
            <div className="bg-neutral-800 border-neutral-700 border p-6 rounded flex flex-col shadow-lg">
                <div className="flex justify-center mt-2 mb-8">
                    <span className='text-4xl'>💪</span>
                </div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border rounded mb-4 bg-neutral-900 border-neutral-600 text-neutral-100"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border rounded mb-4 bg-neutral-900 border-neutral-600 text-neutral-100"
                />
                {!isLocalhost() &&
                    <Turnstile sitekey='0x4AAAAAAA4kcKs0GW2Ic0ke' onError={() => {
                        console.log("SUCCESS")
                        setTurnstileSuccess(true)
                    }} />
                }
                <button
                    disabled={!turnstileSuccess}
                    onClick={handleLogin}
                    className="mt-2 mb-2 p-2 bg-sky-600 text-white rounded"
                >
                    Login
                </button>
            </div>
        </div>
    );
}
