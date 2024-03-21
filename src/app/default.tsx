import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { ShoppingBagIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"
import { SidebarFilter } from "./ui-components/sidebar-filter"
import { useProduct } from "../context/product-contex"
import { addToCart } from "./utils/cart-utils"

export default function DefaultPage() {
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const { products, categories, productsFiltered, search, setSearch } = useProduct();
    const navigation = useNavigate();

    return (
        <div className="grid grid-cols-[auto,1fr] md:gap-8">
            <div className="">
                {!showFilter && (
                    <div className={`sticky -translate-x-2 z-10 w-0 top-32 md:hidden ${showFilter ? 'hidded' : ''}`}
                        onClick={() => setShowFilter(true)}
                    >
                        <button className='rounded-full size-12 bg-primary text-white'>
                            <AdjustmentsHorizontalIcon className="size-8 mx-auto" />
                        </button>
                    </div>
                )}
                <div className="sticky top-8 z-10">
                    <SidebarFilter categories={categories} open={showFilter} setOpen={setShowFilter} />
                </div>
            </div>
            <div>
                <div className="flex items-center mb-10 relative">
                    <input type="text" className="w-full pl-6 pr-16 py-2 border rounded-full outline-2 outline-accent" placeholder="Buscar productos"
                        value={search} onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="absolute right-[1px] bg-primary py-2 px-4 rounded-r-full text-white outline-2 outline-accent">
                        <MagnifyingGlassIcon className="size-6" />
                    </button>
                </div>
                <div className="grid xs:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(productsFiltered.length && productsFiltered || products).map((product, index) => (
                        <div key={`${product.id}-${index}`} className="group border rounded-xl">
                            <div className="relative p-4">
                                <img className="h-56 w-full rounded-lg object-contain object-center" src={product.images[0].url} alt="image" />
                                <div className="absolute top-0 h-full w-auto rounded-lg bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                <div className="absolute inset-0 flex size-full items-center justify-center opacity-0 hover:backdrop-blur-[2px] hover:bg-slate-400/20 group-hover:opacity-100">
                                    <button className="border p-1 rounded-md border-white/10 bg-white/20 text-white backdrop-blur hover:bg-white/30 focus:bg-white/30"
                                        onClick={() => navigation(`/product/${product.id}`, { state: product })}
                                    >
                                        Ver producto
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Link to={`/product/${product.id}`} state={product} className="text-base px-3 font-medium text-slate-700 line-clamp-1 hover:text-primary focus:text-primary">
                                    {product.title}
                                </Link>
                                <div className="my-3 h-px bg-slate-200"></div>
                                <div className="flex justify-between px-3 pb-3">
                                    <div >
                                        <p className="text-xs text-slate-400 leading-none pb-1">
                                            {product.brand} | {product.category.name}
                                        </p>
                                        <p className="text-base font-medium text-primary">
                                            {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(Number(product.price))}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <button className="p-2 rounded-full bg-primary text-white hover:bg-primary/80 focus:bg-primary/90 hover:scale-125 transition-all ease-in-out duration-300"
                                            onClick={async () => {
                                                await addToCart(1, product.id);
                                            }}
                                        >
                                            <ShoppingBagIcon className="size-6" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


/* 
onTouchEnd={handleTouchEnd}
onTouchMove={handleTouchMove}
onTouchStart={handleTouchStart}
*/