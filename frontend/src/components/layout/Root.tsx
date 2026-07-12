import {Outlet} from "react-router-dom";
import Footer from "./Footer.tsx";
import Navbar from "./navbar/Navbar";

function RootLayout() {
    // const navigation = useNavigation();

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 overflow-y-auto min-h-0">
                {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
                <Outlet />
            </main>
            <Footer/>
        </div>
    );
}

export default RootLayout;