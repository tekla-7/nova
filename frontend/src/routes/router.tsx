import {createBrowserRouter} from "react-router-dom";
import RootRedirect from "./RootRedirect.tsx";
import RootLayout from "../components/layout/Root.tsx";
import ErrorPage from "../pages/Error.tsx";
import HomePage from "../pages/Home/Home.tsx";
import LoginPage from "../pages/Login/Login.tsx";
import NotFoundPage from "../pages/NotFound/NotFound.tsx";
import PublicRoute from "./PublicRoute.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import CollectionPage from "../pages/Woman/Collection.tsx";
import ProductDetails from "../pages/ProductDetails/ProductDetails.tsx";
import {loader as productDetailsLoader} from "../pages/ProductDetails/productDetailsLoader.ts";
import AuthLayout from "../components/layout/AuthLayout.tsx";
import Register from "../pages/Register/Register.tsx";
import {action as loginAction} from '../pages/Login/loginAction.ts'
import signUpAction from '../pages/Register/registerAction.ts'
import {QueryClient} from "@tanstack/react-query";
import ShoppingBag from "../pages/ShoppingBag/ShoppingBag.tsx";
import Wishlist from "../pages/Wishlist/Wishlist.tsx";
import Checkout from "../pages/Checkout/Checkout.tsx";
import Order from "../pages/Order/Order.tsx";
import {loader as orderLoader} from '../pages/Order/order.loader.ts'
import Profile from "../pages/Profile/Profile.tsx";
import {loader as profileLoader} from '../pages/Profile/Profile.ts'
import ProfileInfo from "../pages/Profile/pages/ProfileInfo.tsx";
import Addresses from "../pages/Profile/pages/Addresses.tsx";
import Notifications from "../pages/Profile/pages/Notifications.tsx";
import Orders from "../pages/Profile/pages/Orders.tsx";
import EditPersonalInformation from "../pages/Profile/pages/EditPersonalInformation.tsx";
import EditPassword from "../pages/Profile/pages/EtitPassword.tsx";
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootRedirect/>
    },
    // <ProtectedRoute><RootLayout/></ProtectedRoute>,
    {
        path: "/",
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {index: true, element: <HomePage/>},
            {path: 'women', element: <CollectionPage/>},
            {path: 'men', element: <CollectionPage/>},
            {path: 'new-in', element: <CollectionPage/>},
            {
                path: "women/:productId",
                element: <ProductDetails/>,
                loader: productDetailsLoader,
            },
            {
                path: "men/:productId",
                element: <ProductDetails/>,
                loader: productDetailsLoader,
            },
            {
                path: "sale/:productId",
                element: <ProductDetails/>,
                loader: productDetailsLoader,
            },
            {
                path: "new-in/:productId",
                element: <ProductDetails/>,
                loader: productDetailsLoader,
            },
            {
                path: 'shopping-bag',
                element: <ShoppingBag/>
            },
            {
                path: 'wishlist',
                element: <Wishlist/>
            }, {
                path: 'checkout',
                element: <ProtectedRoute><Checkout/></ProtectedRoute>
            },
            {
                path: 'order/:orderId',
                element: <ProtectedRoute><Order/></ProtectedRoute>,
                loader:orderLoader ,
            },
            {  id: "profile",
                path: "profile",
                element: <Profile />,
                loader: profileLoader,
                children: [
                    {
                        index: true,
                        element: <ProfileInfo />,
                    },
                    {
                        path:'edit',
                        element:<EditPersonalInformation/>
                    },
                    {
                        path:'password/edit',
                        element:<EditPassword />
                    },
                    {
                        path: "addresses",
                        element: <Addresses />,
                    },


                    {
                        path: "notifications",
                        element: <Notifications />,
                    },
                    {
                        path: "orders",
                        element: <Orders />,
                    },
                ],
            }

            // { path: "men", element: <MenPage /> },
            // { path: "women", element: <WomenPage /> },
            // { path: "Checkout", element: <SalePage /> },
            // { path: "cart", element: <CartPage /> },
            // { path: "product/:id", element: <ProductPage /> },
        ]
    },
    {
        path: '/authentication',
        element: <PublicRoute><AuthLayout/></PublicRoute>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <LoginPage/>,
                action: loginAction
            },
            {
                path: 'sign-up',
                element: <Register/>,
                action: signUpAction
            },
        ]
    },

    {
        path: '*',
        element: <NotFoundPage/>
    },
])
export const queryClient = new QueryClient()

export default router