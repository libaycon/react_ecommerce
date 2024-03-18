import { Outlet } from "react-router-dom"
import { Header } from "./ui-components/header"
import Footer from "./ui-components/footer"

export default function Home() {
  return (
    <div className="grid grid-rows-[auto,1fr,auto] min-h-screen size-full">
        <Header/>
        <div className="container p-4 mx-auto h-full">
            <Outlet/>
        </div>
        <Footer />
    </div>
  )
}