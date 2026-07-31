import {createBrowserRouter} from "react-router-dom";
import RootRedirect from "./RootRedirect.tsx";
import RootLayout from "../components/layout/Root.tsx";
import PublicRoute from "./PublicRoute.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import {loader as productDetailsLoader} from "../pages/ProductDetails/productDetailsLoader.ts";
import AuthLayout from "../components/layout/AuthLayout.tsx";
import {action as loginAction} from '../pages/Login/loginAction.ts'
import signUpAction from '../pages/Register/registerAction.ts'
import {loader as orderLoader} from '../pages/Order/order.loader.ts'
import {loader as profileLoader} from '../pages/Profile/action/Profile.ts'
import {loader as ordersLoader} from '../pages/Profile/action/orders.ts'
import {action as resetPasswordAction} from '../pages/ResetPassword/resetPasswordAction.ts'
import { lazy } from "react";
import {QueryCache, QueryClient} from "@tanstack/react-query";
import ApiError from "../models/error.ts";
import {isAuthenticated} from "../utils/auth.ts";
import {signOut} from "../services/auth.service.ts";
const HomePage = lazy(() => import("../pages/Home/Home.tsx"));
const LoginPage = lazy(() => import("../pages/Login/Login.tsx"));
const CollectionPage = lazy(() => import("../pages/Woman/Collection.tsx"));
const ProductDetails = lazy(() => import("../pages/ProductDetails/ProductDetails.tsx"));
const ShoppingBag = lazy(() => import("../pages/ShoppingBag/ShoppingBag.tsx"));
const Wishlist = lazy(() => import("../pages/Wishlist/Wishlist.tsx"));
const Checkout = lazy(() => import("../pages/Checkout/Checkout.tsx"));
const Order = lazy(() => import("../pages/Order/Order.tsx"));
const Profile = lazy(() => import("../pages/Profile/Profile.tsx"));
const ProfileInfo = lazy(() => import("../pages/Profile/pages/ProfileInfo.tsx"));
const Addresses = lazy(() => import("../pages/Profile/pages/Addresses.tsx"));
const Notifications = lazy(() => import("../pages/Profile/pages/Notifications.tsx"));
const Orders = lazy(() => import("../pages/Profile/pages/Orders.tsx"));
const EditPersonalInformation = lazy(() => import("../pages/Profile/pages/EditPersonalInformation.tsx"));
const EditPassword = lazy(() => import("../pages/Profile/pages/EtitPassword.tsx"));
const Cards = lazy(() => import("../pages/Profile/pages/Cards.tsx"));
const Register = lazy(() => import("../pages/Register/Register.tsx"));
const ResetPassword = lazy(() => import("../pages/ResetPassword/ResetPassword.tsx"));
const NotFoundPage = lazy(() => import("../pages/NotFound/NotFound.tsx"));
const ErrorPage = lazy(() => import("../pages/Error.tsx"));

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
            {path: 'sale' ,element: <CollectionPage/>},
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
                path: "/:productId",
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
                element:<ProtectedRoute> <Profile /></ProtectedRoute>,
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
                        path: "cards",
                        element: <Cards />,
                    },

                    {
                        path: "notifications",
                        element: <Notifications />,
                    },
                    {
                        path: "orders",
                        loader:ordersLoader,
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
            {
                path: 'reset-password',
                element: <ResetPassword/>,
                action: resetPasswordAction
            },
        ]
    },

    {
        path: '*',
        element: <NotFoundPage/>
    },
])
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
    queryCache: new QueryCache({
        onError: (error) => {
            if (error instanceof ApiError && error.code === 401 && isAuthenticated()) {
                signOut();
            }            }

    }),
})
export default router