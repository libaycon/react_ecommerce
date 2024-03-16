import { ShoppingBagIcon, Squares2X2Icon, UserIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export function Header() {
    const navigate = useNavigate()

  return (
    <div className="container mx-auto flex flex-row flex-nowrap justify-between items-center w-full h-16 px-4" >
      <Link to="/" className="p-2 text-primary hover:underline hover:underline-offset-2 outline-accent transition-all ease-in-out">
        <span className="text-xl font-bold">Electronic X</span>
      </Link>
      <div className="flex flex-nowrap gap-1">
        <button className="p-2 ring-accent outline-2 outline-accent hover:scale-105 transition-all ease-in-out"
            onClick={() => navigate('/login')}
        >
            <UserIcon className="h-6 w-6 text-accent"/>
        </button>
        <button className="p-2 ring-accent outline-2 outline-accent hover:scale-105 transition-all ease-in-out">
            <Squares2X2Icon className="h-6 w-6 text-accent"/>
        </button>
        <button className="p-2 ring-accent outline-2 outline-accent hover:scale-105 transition-all ease-in-out">
            <ShoppingBagIcon className="h-6 w-6 text-accent"/>
        </button>
      </div>
    </div>
  )
}