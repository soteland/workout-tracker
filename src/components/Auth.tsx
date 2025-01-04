
import Turnstile from 'react-turnstile';
import supabase from '../hooks/supabase'
import { useState } from "react";

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [turnstileSuccess, setTurnstileSuccess] = useState(false);

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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded flex flex-col shadow-lg">
                <div className="flex justify-center mt-4 mb-8">
                    <span className='text-4xl'>💪</span>
                </div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border rounded mb-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 p-2 border rounded mb-4"
                />
                <Turnstile sitekey='0x4AAAAAAA4kcKs0GW2Ic0ke' onSuccess={() => { setTurnstileSuccess(true) }} />
                <button
                    disabled={!turnstileSuccess}
                    onClick={handleLogin}
                    className="mt-2 p-2 bg-blue-500 text-white rounded"
                >
                    Login
                </button>
            </div>
        </div>
    );
}
