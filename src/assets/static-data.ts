import {SocialLink} from "../types/static-types"

export const socialIcons:SocialLink[] = [
    {name: "Facebook", icon: "/facebook.png", to: "/"},
    {name: "Linkedin", icon: "/linkedin.png", to:"/"},
    {name: "tiktok", icon: "/tiktok.png", to:"/"},
    {name: "X", icon: "/xcom.png", to:"/"},
    {name: "Youtube", icon: "/youtube.png", to:"/"}
]

export const dahsboardLinks:{name:string, to: string}[] = [
    {name: "Perfil de Cuenta", to: "/user"},
    {name: "Mis Compras", to: "/user/purchases"},
    {name: "Usuarios", to: "/user/users"},
]