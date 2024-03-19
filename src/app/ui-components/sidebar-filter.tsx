import { useState } from 'react';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import styles from './progres.module.css'
import stylesSwitch from './switch.module.css'

export function SidebarFilter({ categories }: { categories: { id: number, name: string }[] }) {
    const [values, setValues] = useState<{ [key: string]: number }>({ min: 0, max: 10000 })
    const [currentCategory, setCurrentCategory] = useState<number | null>(null)

    return (
        <div className='hidden md:block border max-w-[250px]'>
            <div className='flex flex-col gap-4 border-b p-4'>
                <div>
                    <span className='text-lg font-semibold'>Precio:</span>
                </div>
                <div className="flex justify-center items-center gap-4 font-semibold text-slate-500">
                    <span>{values.min}</span>
                    <ArrowsRightLeftIcon className="size-4" />
                    <span>{values.max}</span>
                </div>
                <label className="block max-w-xs">
                    <input
                        className={styles.drag__bar}
                        min={0}
                        max={5000}
                        type="range"
                        value={values.min}
                        onChange={(e) => setValues({ ...values, min: Number(e.target.value) })}
                    />
                    <input
                        style={{ borderRadius: '0 5px 5px 0' }}
                        className={styles.drag__bar}
                        min={5001}
                        max={10000}
                        type="range"
                        value={values.max}
                        onChange={(e) => setValues({ ...values, max: Number(e.target.value) })}
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
                                <input type="radio" className='opacity-0 size-0' value={category.id} checked={currentCategory === category.id}
                                    onChange={() => setCurrentCategory(category.id)}
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