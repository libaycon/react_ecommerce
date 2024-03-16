import { useEffect, useState } from "react"
import { Product } from "../types/product-types"

export default function DefaultPage() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        fetch('https://e-commerce-api-v2.academlo.tech/api/v1/products')
            .then(response => response.json())
            .then((data: Product[]) => setProducts(data))
    }, [])
    return (
        <div>
            <div></div>
            <div className="grid grid-cols-4">
                {products.map((product, index) => (
                    <div key={`${product.id}-${index}`} className="card group p-3">
                        <div className="relative mt-4">
                            <img className="h-56 w-full rounded-lg object-cover object-center" src={product.images[0].url} alt="image" />
                            <div className="absolute top-0 h-full w-auto rounded-lg bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <div className="absolute top-0 flex h-full w-full items-center justify-center opacity-0 group-hover:opacity-100">
                                <button className="btn min-w-[7rem] border border-white/10 bg-white/20 text-white backdrop-blur hover:bg-white/30 focus:bg-white/30">
                                    Place a Bid
                                </button>
                            </div>
                        </div>
                        <div className="mt-3 px-1">
                            <a href="#" className="text-base font-medium text-slate-700 line-clamp-1 hover:text-primary focus:text-primary dark:text-navy-100 dark:hover:text-accent-light dark:focus:text-accent-light">
                                The Runner #265
                            </a>
                            <div className="my-3 h-px bg-slate-200 dark:bg-navy-500"></div>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-xs text-slate-400 dark:text-navy-300">
                                        Ending in
                                    </p>
                                    <p className="text-base font-medium text-slate-700 dark:text-navy-100">
                                        9h 12m 33s
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-400 dark:text-navy-300">
                                        Highest bid
                                    </p>
                                    <p className="text-base font-medium text-primary dark:text-accent-light">
                                        4.56 ETH
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}