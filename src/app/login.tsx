import { useEffect, useState } from "react"
import { AtSymbolIcon, KeyIcon, ArrowPathIcon, PaperAirplaneIcon, } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import { loginValidate } from "./utils/zod-form-validates"
import { useNavigate } from "react-router-dom"


export default function Login() {
    const [loaidng, setLoading] = useState<boolean>(false);
    const [formState, setFormState] = useState<{success?:string, error?:string}>({success: undefined , error: undefined});
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const navigate = useNavigate();

    const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(e.currentTarget);
        const data = await loginValidate(formData);
        if(data.success) {
            setFormState(data);
            form.reset();

        } else if(data.errors) {
            const firstError = Object.values(data.errors)[0][0];
            setFormState({error: firstError});
        }
        setLoading(false);
    }

    useEffect(() => {
        if(localStorage.getItem('token')) {
            navigate('/user');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formState.success])
    
    return (
        <div className="flex justify-center items-center h-full">
                    <div className="w-full max-w-[26rem] p-4 sm:px-5 text-slate-400">
            <div className="text-center">
                <img className="mx-auto size-16 select-none" src="/logo.png" alt="logo" />
                <div className="mt-4">
                    <h2 className="text-2xl font-semibold text-slate-600">
                        Bienvenido
                    </h2>
                    <p className="text-slate-400">
                        Ingrese a su cuenta para continuar
                    </p>
                </div>
            </div>
            <form onSubmit={onsubmit} className="mt-5 rounded-lg p-5 lg:p-7 border shadow-sm shadow-accent/50">
                {formState.success && <p className="mb-4 leading-none text-center text-green-500">{formState.success}</p>}
                <label className="block">
                    <span>Email:</span>
                    <span className="relative mt-1.5 flex">
                        <input
                            name="email"
                            className="text-slate-500 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 focus:z-10 focus:border-primary outline-none"
                            placeholder="Ingrese su correo electrónico"
                            type="email"
                        />
                        <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary">
                            <AtSymbolIcon className="size-5 transition-colors duration-200" />
                        </span>
                    </span>
                </label>
                <label className="mt-4 block">
                    <span>Contraseña:</span>
                    <span className="relative mt-1.5 flex">
                        <input
                            name="password"
                            className="text-slate-500 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 focus:z-10 focus:border-primary outline-none"
                            placeholder="Ingrese su contraseña"
                            type={showPassword? "text": "password"} />
                        <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary">
                            <KeyIcon className="size-5 transition-colors duration-200" />
                        </span>
                    </span>
                </label>
                <div className="mt-4 flex items-center justify-between space-x-2">
                    <label className="inline-flex items-center space-x-2">
                        <input className="form-checkbox is-basic size-5 rounded border-slate-400/70 checked:border-primary checked:bg-primary hover:border-primary focus:border-primary" 
                        type="checkbox" 
                        onClick={() => setShowPassword(!showPassword)}
                        />
                        <span className="line-clamp-1 text-sm">Ver contraseña</span>
                    </label>
                    <Link to="#" className="text-xs text-slate-400 transition-colors line-clamp-1 hover:text-slate-800 focus:text-slate-800">Recuperar Contraseña?</Link>
                </div>
                <button className="mt-5 py-1.5 rounded-md w-full bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90">
                    Iniciar Sesión {!loaidng? <PaperAirplaneIcon className="inline-block size-5" /> : <ArrowPathIcon className="animate-spin inline-block size-5" />}
                </button>
                <div className="mt-4 text-center text-xs+">
                    <p className="line-clamp-1">
                        <span>No tienes cuenta?</span>

                        <Link className="text-primary transition-colors hover:text-primary-focus dark:text-accent-light dark:hover:text-accent" to="/register"> Create una cuenta</Link>
                    </p>
                </div>
                {formState.error && <p className="mt-4 leading-none text-center text-red-500">{formState.error}</p>}
            </form>
            <div className="mt-8 flex justify-center text-xs text-slate-400">
                <Link to="#">Privacy Notice</Link>
                <div className="mx-3 my-1 w-px bg-slate-200"></div>
                <Link to="#">Term of service</Link>
            </div>
        </div>
        </div>
    )
}