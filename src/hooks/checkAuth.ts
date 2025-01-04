// import { useState, useEffect } from "react";
// import supabase from "./supabase"; // Adjust the import path based on your project

// const useAuth = () => {
//     const [dataAuth, setDataAuth] = useState<any>(null);

//     useEffect(() => {
//         setDataAuth(checkAuth());
//     }, []);

//     const checkAuth = async () => {
//         const user = supabase.auth.getSession();
//         return (await user).data;
//     };

//     return dataAuth;
// };

// export default useAuth;
