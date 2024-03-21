import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { PowerIcon } from "@heroicons/react/24/outline";

export default function UserPage() {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    return (
        <div className="grid grid-cols-[auto,1fr] gap-8">
            <div className="flex flex-col gap-4">
                <h1 className="text-xl font-semibold">My Account</h1>
                <div className="flex flex-col gap-4">
                    <ul>
                        <li>
                            <NavLink to="/user">My Profile</NavLink>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <NavLink to="">My Orders</NavLink>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <NavLink to="">Users</NavLink>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <button className="flex items-center text-white bg-accent px-4 py-1 gap-2 hover:bg-primary rounded-md ring-accent outline-2 outline-accent transition-all ease-in-out" 
                                onClick={() => {
                                localStorage.removeItem('token');
                                setToken(null);
                                navigate('/login');
                            }}
                            >
                                <PowerIcon className="h-6 w-6" />
                            Cerrar Session
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <h1>My Orders</h1>

            </div>
        </div>
    )
}