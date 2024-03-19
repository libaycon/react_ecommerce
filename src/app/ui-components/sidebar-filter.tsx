import { useProduct } from '../../context/product-contex';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import styles from './progres.module.css'
import stylesSwitch from './switch.module.css'

export function SidebarFilter({ categories }: { categories: { id: number, name: string }[] }) {
    const {priceFilter, setPriceFilter, currentCategory, setCurrentCategory} = useProduct();

    return (
        <div className='hidden md:block border max-w-[250px]'>
            <div className='flex flex-col gap-4 border-b p-4'>
                <div>
                    <span className='text-lg font-semibold'>Precio:</span>
                </div>
                <div className="flex justify-center items-center gap-4 font-semibold text-slate-500">
                    <span>{priceFilter.min}</span>
                    <ArrowsRightLeftIcon className="size-4" />
                    <span>{priceFilter.max}</span>
                </div>
                <label className="block max-w-xs">
                    <input
                        className={styles.drag__bar}
                        min={0}
                        max={2500}
                        type="range"
                        value={priceFilter.min}
                        onChange={(e) => setPriceFilter({ ...priceFilter, min: Number(e.target.value) })}
                    />
                    <input
                        style={{ borderRadius: '0 5px 5px 0' }}
                        className={styles.drag__bar}
                        min={2501}
                        max={5000}
                        type="range"
                        value={priceFilter.max}
                        onChange={(e) => setPriceFilter({ ...priceFilter, max: Number(e.target.value) })}
                    />
                </label>
                <button className="flex flex-nowrap items-center justify-center bg-primary hover:bg-primary/80 font-medium text-xs  text-white py-2 w-full rounded-full uppercase mt-4">
                    Filtrar precio
                </button>
            </div>
            <div className='flex flex-col gap-4 p-4 pb-8'>
                <div>
                    <span className='text-lg font-semibold'>Categorias:</span>
                </div>
                <div className='flex flex-col gap-3 select-none'>
                    {categories.map((category, index) => (
                        <div key={`${category.id}-${index}`}>
                            <label className={stylesSwitch.switch}>
                                <input type="checkbox" className='opacity-0 size-0' value={category.id} checked={currentCategory.id === category.id}
                                    onChange={(e) => setCurrentCategory({id: currentCategory.id === category.id ? null : Number(e.target.value), isUsed: true})}
                                />
                                <span className={stylesSwitch.slider}></span>
                                <span className='text-sm absolute left-[115%] text-slate-500 font-semibold text-nowrap pt-1'>{category.name}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}