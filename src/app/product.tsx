import { useState, useEffect } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { Product } from "../types/product-types"
import { ChevronRightIcon, ChevronLeftIcon, MinusIcon, PlusIcon, ShoppingBagIcon, ArrowPathIcon } from "@heroicons/react/24/outline"
import RelatedProduct  from "./ui-components/related-product"
import { addToCart } from "./utils/cart-utils"

export default function ProductPage() {
    const { state }: { state: Product } = useLocation();
    const [product, setProduct] = useState<Product>(state);
    const [quantity, setQuantity] = useState<number>(1);
    const [currentImage, setCurrentImage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const { id } = useParams();

    useEffect(() => {
        if (!state?.id || state.id !== Number(id)) {
            fetch('https://e-commerce-api-v2.academlo.tech/api/v1/products/' + id)
                .then(response => response.json())
                .then((data: Product) => setProduct(data));
        }
    }, [id, state?.id])

    return product?.id ? (
        <div className="pb-20">
            <div className="flex flex-nowrap items-center line-clamp-1 text-sm text-accent font-semibold select-none px-2">
                <Link to="/" className="hover:underline">Inicio</Link> <ChevronRightIcon className="size-4" /> <span className="text-slate-400 line-clamp-1">{product.title}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
                <div className="flex flex-col gap-8 pb-8 pt-8 md:pt-16">
                    <div className="relative flex items-center h-[200px] sm:max-h-[420px] sm:min-h-[420px] select-none">
                        <img src={product.images[currentImage].url} alt="product" className="w-full h-full object-contain object-center" />

                        <div className="absolute left-0 flex justify-start items-center w-1/2 h-full [&>button]:hover:opacity-100" 
                            onClick={() => setCurrentImage(currentImage - 1 < 0 ? product.images.length - 1 : currentImage - 1)}
                        >
                            <button className="flex items-center justify-center size-10 rounded-full bg-accent-light text-white text-center opacity-50"
                            >
                                <ChevronLeftIcon className="size-6" />
                            </button>
                        </div>
                        <div className="absolute right-0 flex justify-end items-center w-1/2 h-full [&>button]:hover:opacity-100"
                            onClick={() => setCurrentImage(currentImage + 1 > product.images.length - 1 ? 0 : currentImage + 1)}
                        >
                            <button className="flex items-center justify-center size-10 rounded-full bg-accent-light text-white text-center opacity-50"
                            >
                                <ChevronRightIcon className="size-6" />
                            </button>
                        </div>

                    </div>
                    <div>
                        <div className="flex flex-row gap-4 mt-4">
                            {product.images.map((image, index) => (
                                <button key={`${image.id}-${index}`}
                                    className={`w-1/4 h-20 p-2 rounded-md hover:border-2 hover:border-primary/50 select-none transition-all ease-in-out duration-300 ${currentImage === index ? 'border-2 border-primary opacity-100' : 'border opacity-80'}`}
                                    onClick={() => setCurrentImage(index)}
                                >
                                    <img src={image.url} alt="product" className="w-full h-full object-contain object-center" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 p-4 sm:p-8">
                    <span className="text-slate-400 text-sm font-semibold">{product.brand}</span>
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <p className="text-md text-slate-500">{product.description}</p>
                    <div className="flex flex-row justify-between items-end my-8">
                        <div>
                            <span className="text-slate-400 text-sm font-semibold">Precio</span>
                            <p className="text-lg font-bold text-primary">{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(Number(product.price))}</p>
                        </div>
                        <div className="flex flex-row border max-w-[180px] border-accent focus:outline-0 rounded-full h-max [&>button]:h-10 [&>button]:py-1 [&>button]:text-white [&>button]:bg-accent [&>button]:px-4 overflow-hidden">
                            <button onClick={() => setQuantity(quantity > 1? quantity-1: 1)}>
                                <MinusIcon className="size-5" />
                            </button>
                            <input
                                type="text"
                                className="flex h-10 w-full text-center"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                            <button onClick={() => setQuantity(quantity + 1)}>
                                <PlusIcon className="size-5" />
                            </button>
                        </div>
                    </div>
                    <button className="flex flex-nowrap items-center justify-center bg-primary font-medium text-md md:text-lg text-white lg:px-10 py-2 w-full xl:w-max rounded-md uppercase"
                        onClick={() => {
                            addToCart(quantity, product.id);
                        }}
                    >
                        Agregar a mi bolsa {loading? <ShoppingBagIcon className="size-5 ml-4" />: <ArrowPathIcon className="animate-spin inline-block size-5" /> }
                    </button>
                </div>
            </div>
            <div>
                <RelatedProduct title={product.brand} categoryId={product.categoryId} />
            </div>
        </div>
    ) : (
        <div className="flex size-full items-center justify-center">
            <span>Loading</span>
        </div>
    )
}