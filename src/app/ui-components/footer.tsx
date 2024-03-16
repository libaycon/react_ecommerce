import { Link } from "react-router-dom"
import { socialIcons } from "../../assets/static-data"
import { Tooltip } from './tooltip'

export default function Footer() {

    return (
        <div className="w-full border-t py-2">
            <footer className="container flex flex-col mx-auto gap-4">
                <p className="text-center text-slate-500 font-light">
                    © {new Date().getFullYear()} Electronic X
                </p>
                <div className="flex gap-2 mx-auto">
                    {socialIcons.map((link, index) => (
                        <div key={`${link.name}-${index}`}>
                            <Tooltip text={link.name}>
                                <Link to={link.to} target="blank" className="h-8 w-8 flex outline-2 outline-accent opacity-90">
                                    <img src={link.icon} alt={link.name} className="size-full" />
                                </Link>
                            </Tooltip>
                        </div>
                    ))}
                </div>
            </footer>
        </div>
    )
}