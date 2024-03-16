export function Tooltip({ children, text, className }: { children: React.ReactNode, text: string, className?: string }) {
    return (
        <div className={`relative ${className} [&>.tooltip]:hover:opacity-100 [&>.tooltip]:hover:visible`}>
            {children}
            <span className="tooltip absolute  opacity-0 invisible top-[-50px] left-1/2 transform -translate-x-1/2 translate-y-full bg-black text-white text-xs font-semibold px-2 py-1 rounded-md whitespace-nowrap capitalize transition-all duration-300 ease-in-out z-10">
                {text}
            </span>
        </div>
    )
}