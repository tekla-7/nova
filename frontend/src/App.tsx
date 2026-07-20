import {RouterProvider} from "react-router-dom";
import router, {queryClient} from "./routes/router.tsx";
import { QueryClientProvider} from "@tanstack/react-query";
import type {RootState} from "./store";
import {useSelector} from "react-redux";
import Notification from "./components/layout/Notification.tsx";


function App() {
    const notification = useSelector((state: RootState) => state.ui.notification);
    return (<>

            {<span id='modal'/>}
            {notification && <Notification/>}
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider></>

    )
}

export default App
