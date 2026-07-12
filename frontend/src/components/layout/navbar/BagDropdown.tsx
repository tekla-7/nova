import {useState} from "react";
import {Handbag, LockKeyhole} from "lucide-react";
import {Link} from "react-router-dom";
import {useUserCartData} from "../../../hooks/useUserData.ts";
import ProductCartItem from "./ProductCartItem.tsx";
import {useMutation} from "@tanstack/react-query";
import {deleteCartItem} from "../../../utils/http.ts";
import {queryClient} from "../../../routes/router.tsx";

export default function BagDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const {
        data = [],
    } = useUserCartData();
    const cartItems = (data ?? []).slice(0, 3);
    const itemCount = (data ?? []).reduce((prev, cur) => prev + cur.quantity, 0);
    const subTotal = (data ?? []).reduce((prev, cur) => cur.product.price + prev, 0)

    function toggleOpen() {
        setIsOpen(v => !v)
    }

    const {mutate} = useMutation({
        mutationFn: deleteCartItem,

    });

    function onDeleteCart(id: string) {
        mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['userCartData']})
                    .then(() => console.log("invalidation completed"))
                    .catch(err => console.log("invalidation error:", err));
            },
            onError: (err) => {
                console.log("error", err);
            },
            onSettled: () => {
                console.log("++++++++++settled");
            },
        })
    }

    return <div className='relative'>
        <div className='relative'>
            <Handbag onClick={toggleOpen} size={18} className='cursor-pointer'/>
            {itemCount > 0 &&
                <span
                    className='text-[9px] text-white bg-[#D63B3B] w-[15px] h-[15px] rounded-full flex items-center justify-center absolute -top-1.5 -right-1.5'>{itemCount}</span>}
        </div>

        <div
            className={`absolute top-12 -right-2 w-[340px] rounded-[10px] border border-[#E5E0D8] bg-white
  transition-all duration-300 ease-out cursor-auto
  ${
                isOpen
                    ? "opacity-100 translate-y-0 scale-100 visible"
                    : "opacity-0 -translate-y-2 scale-95 invisible"
            }`}>

            {itemCount == 0 &&
                <div className='p-4 flex items-center flex-col'>
                    <p className='text-[12px] pb-3 pt-2 text-[#9A9A9A]'>Your bag is empty</p>
                    <Link to="/new-in" onClick={toggleOpen}
                          className='text-sm px-4 text-center py-2 bg-transparent text-[#0b0b0b] border w-full border-[#0b0b0b33] rounded-lg cursor-pointer mb-2'>
                        Start shopping
                    </Link></div>
            }
            {itemCount > 0 && <div className='flex flex-col'>
                <div className='py-3.5 px-4 border-b border-b-[#F0EDE8]  flex items-center justify-between'>
                    <span className='text-xs font-medium'>Your bag </span>
                    <span className='text-[#9A9A9A] text-xs'>{itemCount} items</span>
                </div>
                <ul>
                    {cartItems.map(cart =>
                        <ProductCartItem key={cart.id} cart={cart} onClick={() => onDeleteCart(cart.id)}/>
                    )}
                </ul>
                <div className='py-3.5 px-4 flex flex-col '>
                    <div className='text-[#0b0b0b] flex items-center justify-between text-[13px] mb-2.5'>
                        <span>Subtotal</span>
                        <span>${subTotal.toFixed(2)}</span>
                    </div>

                    <Link to="/checkout"
                          className='text-sm font-medium px-4 flex items-center  justify-center text-center py-2 bg-transparent text-[#0b0b0b] border w-full border-[#0b0b0b33] rounded-lg cursor-pointer mb-2'>
                     <LockKeyhole size={14} className='mr-1'/>   Checkout
                    </Link>
                    <Link to="/shopping-bag"
                          className='text-sm font-medium px-4 flex items-center text-center justify-center py-2 bg-transparent text-[#0b0b0b] border w-full border-[#0b0b0b33] rounded-lg cursor-pointer mb-1.5'>
                      <Handbag size={14} className='mr-1'/>  View bag
                    </Link>
                </div>
            </div>
            }


        </div>
    </div>
}
