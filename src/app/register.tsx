import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AtSymbolIcon, KeyIcon, ArrowPathIcon, PaperAirplaneIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import { validateRegister } from "./utils/zod-form-validates"


export default function Register() {
    const [loaidng, setLoading] = useState<boolean>(false)
    const [formState, setFormState] = useState<{success?:string, error?:string}>({success: undefined , error: undefined})
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate(); 

    const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(e.currentTarget)
        const data = await validateRegister(formData)
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
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[formState.success]);

    return (
        <div className="flex justify-center items-center h-full">
            <div className="w-full max-w-[26rem] p-4 sm:px-5 text-slate-400">
                <div className="text-center">
                    <img className="mx-auto size-16 select-none" src="/logo.png" alt="logo" />
                    <div className="mt-4">
                        <h2 className="text-2xl font-semibold text-slate-600">
                            Regístrate
                        </h2>
                        <p className="text-slate-400">
                            Crea una cuenta para disfrutar de todos los beneficios que tenemos para ti.
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
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <label className="block">
                            <span>Nombre:</span>
                            <span className="relative mt-1.5 flex">
                                <input
                                    name="first_name"
                                    className="text-slate-500 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 focus:z-10 focus:border-primary outline-none"
                                    placeholder="Nombre"
                                    type="text"
                                />
                            </span>
                        </label>
                        <label className="block">
                            <span>Apellido:</span>
                            <span className="relative mt-1.5 flex">
                                <input
                                    name="last_name"
                                    className="text-slate-500 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 focus:z-10 focus:border-primary outline-none"
                                    placeholder="Apellido"
                                    type="text"
                                />
                            </span>
                        </label>
                    </div>
                    <label className="mt-4 block">
                        <span>Numero de Celular:</span>
                        <span className="relative mt-1.5 flex">
                            <input 
                                name="phone"
                                className="text-slate-500 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 focus:z-10 focus:border-primary outline-none"
                                placeholder="Ingrese su número de celular"
                                type="text" />
                            <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary">
                                <DevicePhoneMobileIcon className="size-5 transition-colors duration-200" />
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
                            <input className="form-checkbox is-basic size-5 rounded border-slate-400/70 checked:border-primary checked:bg-primary hover:border-primary focus:border-primary" type="checkbox" 
                                onClick={() => setShowPassword(!showPassword)}
                            />
                            <span className="line-clamp-1 text-sm">Ver contraseña</span>
                        </label>
                    </div>
                    <button type="submit" 
                        disabled={loaidng}
                        className="flex justify-center items-center gap-2 mt-5 py-1.5 rounded-md w-full bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90">
                        Registrarse
                            {loaidng? <ArrowPathIcon className="size-5 animate-spin" /> : <PaperAirplaneIcon className="size-5" />}
                    </button>
                    <div className="mt-4 text-center text-xs+">
                        <p className="line-clamp-1">
                            <span>Ya tienes cuenta?</span>

                            <Link className="text-primary transition-colors hover:text-primary-focus dark:text-accent-light dark:hover:text-accent" to="/login"> 
                                Initia Sesión
                            </Link>
                        </p>
                    </div>
                    {formState.error && <p className="mt-4 text-center text-red-500">{formState.error}</p>}
                </form>
                <div className="mt-8 flex justify-center text-xs text-slate-400">
                    <Link to="#">
                        Política de privacidad
                    </Link>
                    <div className="mx-3 my-1 w-px bg-slate-200"></div>
                    <Link to="#">Terminos de servicio</Link>
                </div>
            </div>
        </div>
    )
}