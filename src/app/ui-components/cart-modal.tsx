import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { XMarkIcon, PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { CartItem } from "../../types/product-types";
import { updateQuantity, delteItem } from "../utils/cart-utils";

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    token: string | null;
}

export function CartModal({ open, setOpen, ...rest }: ModalProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getCart = async () => {
            const response = await fetch('https://e-commerce-api-v2.academlo.tech/api/v1/cart', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${rest.token}`
                },
                redirect: 'follow'
            });
            const data: CartItem[] = await response.json();
            setCartItems(data);
        }
        if (open && rest.token) {
            getCart();
        } else if (open && !rest.token) {
            console.log(rest.token)
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);
    //console.log(cartItems);
    return (
        <div className={`fixed right-0 top-0 flex z-20 justify-end bg-black/50 backdrop-blur-sm overflow-hidden ${open ? 'inset-0' : 'size-0'}`}
            onClick={() => setOpen(false)}
        >
            <div className={`grid grid-rows-[auto,1fr,auto] gap-8 relative right-0 xs:max-w-sm bg-white h-full p-4 xxs:p-8 transition-all ease-in-out duration-600 ${open ? 'w-full translate-x-0' : 'w-0 translate-x-full'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <span className="text-xl font-bold">Carrito de compras</span>
                <div className="flex flex-col gap-10 max-h-max h-full overflow-y-auto">
                    {cartItems?.map((item, index) => (
                        <div key={`${item.productId}-${index}`} className="relative flex flex-row items-start gap-2 xxs:gap-4">
                            <div className="size-16 min-w-[4rem] p-1 border border-accent-light/50 rounded-sm">
                                <img src={item.product.images[0].url} alt="product" className="w-full h-full object-contain object-center" />
                            </div>
                            <div className="flex flex-col justify-between w-full h-16 rounded-sm">
                                <span className="text-sm text-slate-500 font-semibold line-clamp-1">{item.product.title}</span>
                                <div className="flex flex-row justify-between max-w-24 w-full border">
                                    <button className="px-1 ring-accent outline-2 outline-accent hover:scale-105 transition-all ease-in-out"
                                        onClick={async () => {
                                            if (item.quantity > 1) {
                                                const reponse = await updateQuantity(item.quantity - 1, item.id);
                                                if (reponse.success?.data) {
                                                    const data = reponse.success.data;
                                                    const updateItems = cartItems.map((cartItem) => {
                                                        if (cartItem.id === item.id) {
                                                            return { ...cartItem, quantity: data.quantity }
                                                        }
                                                        return cartItem;
                                                    });
                                                    setCartItems(updateItems);
                                                }
                                            } else {
                                                const response = await delteItem(item.id);
                                                if (response.success) {
                                                    const updateItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
                                                    setCartItems(updateItems);
                                                }
                                            }
                                        }}
                                    >
                                        <MinusIcon className="size-4" />
                                    </button>
                                    <span className="w-full text-center border-x">{item.quantity}</span>
                                    <button className="px-1 ring-accent outline-2 outline-accent hover:scale-105 transition-all ease-in-out"
                                        onClick={async () => {
                                            const reponse = await updateQuantity(item.quantity + 1, item.id);
                                            if (reponse.success?.data) {
                                                const data = reponse.success.data;
                                                const updateItems = cartItems.map((cartItem) => {
                                                    if (cartItem.id === item.id) {
                                                        return { ...cartItem, quantity: data.quantity }
                                                    }
                                                    return cartItem;
                                                });
                                                setCartItems(updateItems);
                                            }
                                        }}
                                    >
                                        <PlusIcon className="size-4" />
                                    </button>
                                </div>
                                <div className="absolute right-0 xxs:right-8 bottom-0 flex flex-col">
                                    {item.quantity > 1 && (<span className="text-xs text-slate-400 font-semibold line-through">
                                        {
                                            new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(Number(item.product.price))
                                        }
                                    </span>)}
                                    <span className="text-sm text-primary font-semibold">
                                        {
                                            new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(Number(item.product.price) * item.quantity)
                                        }
                                    </span>
                                </div>
                            </div>
                            <button className="p-1 size-8 ring-accent outline-2 outline-accent hover:scale-105 transition-all ease-in-out text-red-500" onClick={async () => {
                                const response = await delteItem(item.id);
                                if (response.success) {
                                    const updateItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
                                    setCartItems(updateItems);
                                }
                            }}>
                                <TrashIcon className="size-5" />
                            </button>
                        </div>
                    ))}
                    {cartItems.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full">
                            <span className="text-lg font-semibold">Tu carrito esta vacio</span>
                            <button className="flex flex-nowrap items-center justify-center bg-accent/50 hover:bg-primary/80 font-medium text-sm text-white py-2 px-4 w-max rounded-md uppercase"
                                onClick={() => setOpen(false)}
                            >
                                Seguir comprando
                            </button>
                        </div>
                    
                    )}
                </div>
                <div className="flex flex-col gap-4 border-t pt-4">
                    <span className="text-lg font-semibold">
                        Total: <span className="text-primary">{
                            new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(
                                cartItems.reduce((acc, item) => acc + Number(item.product.price) * item.quantity, 0)
                            )
                        }</span>
                    </span>
                    <button className="flex flex-nowrap items-center justify-center bg-primary hover:bg-primary/80 font-medium text-sm text-white py-2 w-full rounded-full uppercase">
                        Ir a pagar
                    </button>
                </div>
            </div>
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4">
                <XMarkIcon className="h-6 w-6 text-slate-500" />
            </button>
        </div>
    )
}