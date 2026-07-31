import {Outlet} from "react-router-dom";
import Footer from "./Footer.tsx";
import Navbar from "./navbar/Navbar";
import ProgressBar from "./ProgressBar.tsx";
import { Suspense } from "react";

function RootLayout() {
    // const navigation = useNavigation();
    return (
        <div className="min-h-screen flex flex-col">
            <ProgressBar/>
            <Navbar />
            <main className="flex-1 flex  min-h-0">
                {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
                <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
                </Suspense>
            </main>
            <Footer/>
        </div>
    );
}

export default RootLayout;