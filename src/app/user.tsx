import { useEffect, useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { PowerIcon } from "@heroicons/react/24/outline";
import { dahsboardLinks } from "../assets/static-data";
import styles from './lists.module.css';

export default function UserPage() {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    return (
        <div className="grid grid-cols-[auto,1fr] gap-8">
            <div className="flex flex-col gap-4">
                <h1 className="text-xl font-semibold">Mi Cuenta</h1>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4 px-6 border-l border-accent/30">
                        {dahsboardLinks.map((link, index) => (
                            <ul key={`${link.name}-${index}`} className="relative">
                                <li className={`${styles.links}`}>
                                    <NavLink to={link.to}>{link.name}</NavLink>
                                </li>
                            </ul>
                        ))}
                    </div>

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