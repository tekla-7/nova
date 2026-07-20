import {Outlet} from "react-router-dom";
import SideBar from "./sections/SideBar.tsx";

export default function Profile() {

    return <section className="flex flex-1 w-full">
        <SideBar/>
        <main className="flex-1 p-5.5">
            <Outlet/>
        </main>
    </section>
}