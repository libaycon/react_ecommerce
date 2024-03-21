import { useState } from "react"
import { ShoppingBagIcon, Squares2X2Icon, UserIcon, InboxStackIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { CartModal } from "./cart-modal"

export function Header() {
  const [open, setOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('token');

  return (
    <div className="max-w-[1536px] w-full px-4 md:px-8 mx-auto flex flex-row flex-nowrap justify-between items-center h-16" >
      <Link to="/" className="p-2 text-primary hover:underline hover:underline-offset-2 outline-accent transition-all ease-in-out">
        <span className="text-xl font-bold">Electronic X</span>
      </Link>
      <div className="flex flex-nowrap gap-1">
        <button className="p-2 ring-accent outline-2 outline-accent hover:scale-105 transition-all ease-in-out"
          onClick={() => navigate(token ? '/user' : '/login')}
        >
          {token ? <InboxStackIcon className="h-6 w-6 text-accent" /> : <UserIcon className="h-6 w-6 text-accent" />}
        </button>
        <button className="p-2 ring-accent outline-2 outline-accent hover:scale-105 transition-all ease-in-out"
          onClick={() => navigate('/user/purchases')}
        >
          <Squares2X2Icon className="h-6 w-6 text-accent" />
        </button>
        <button className="p-2 ring-accent outline-2 outline-accent hover:scale-105 transition-all ease-in-out"
          onClick={() => setOpen(true)}
        >
          <ShoppingBagIcon className="h-6 w-6 text-accent" />
        </button>
      </div>
      <CartModal open={open} setOpen={setOpen} token={token} />
    </div>
  )
}