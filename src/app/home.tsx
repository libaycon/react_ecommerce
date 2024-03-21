import { Outlet } from "react-router-dom"
import { Header } from "./ui-components/header"
import Footer from "./ui-components/footer"

export default function Home() {
  return (
    <div className="relative grid grid-rows-[auto,1fr,auto] min-h-screen size-full">
        <Header/>
        <div className="max-w-[1536px] w-full p-4 md:p-8 mx-auto h-full">
            <Outlet/>
        </div>
        <Footer />
    </div>
  )
}