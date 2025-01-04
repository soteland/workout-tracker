
import supabase from '../hooks/supabase'
import { useState } from "react";

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        console.log(data, error);
    };

    // useEffect(() => {
    //     setDataAuth(checkAuth())
    // }, []);

    // const checkAuth = async () => {
    //     const user = supabase.auth.getSession();
    //     //console.log(await user);
    //     return (await user).data
    // };

    // console.log(dataAuth);

    // if (dataAuth)
    //     if (dataAuth.session)
    //         return (<></>)

    //em#zmxSwL&F4Gn%@cFB#

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded flex flex-col shadow-lg">
                <div className="flex justify-center mt-4 mb-8">
                    <span className='text-4xl'>💪</span>
                </div>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 p-2 border rounded"
                />
                <button
                    onClick={handleLogin}
                    className="mt-2 p-2 bg-blue-500 text-white rounded"
                >
                    Login
                </button>
            </div>
        </div>
    );
}
