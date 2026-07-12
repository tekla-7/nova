import {NavLink, useLoaderData, useLocation} from "react-router-dom";
import Gallery from "./sections/Gallery.tsx";
import Info from "./sections/Info.tsx";

export default function ProductDetails() {
    const productDetails = useLoaderData();
    const location = useLocation();
    const pagePath = location.pathname.split("/");

    return <>
        <div className='flex items-center gap-1 border-b border-[#E5E0D8] py-3 px-6'>
            <NavLink className='text-xs text-[#9A9A9A] cursor-pointer' to='/'>Home</NavLink>
            <p className='text-xs text-[#E5E0D8]'>/</p>
            <NavLink className='text-xs text-[#9A9A9A] cursor-pointer' to={'/' + pagePath[1]}>{pagePath[1]}</NavLink>
            <p className='text-xs text-[#E5E0D8]'>/</p>
            <p className='text-xs text-[#0D0D0D]'>{productDetails.title}</p>
        </div>
        <div className='grid grid-cols-2 gap-5 p-5'>
            <Gallery images={productDetails.images}/>
            <Info/>
        </div>
    </>
}

