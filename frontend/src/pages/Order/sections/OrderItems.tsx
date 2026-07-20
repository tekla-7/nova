import type {Order} from "../../../types/Order.ts";

export default function OrderItems({order}: { order: Order }) {
    return <>
        <h1 className='text-xs mt-5 font-semibold tracking-wider uppercase mb-3.5 text-[#898781]'>items in this
            order</h1>
        <ul className='mb-5'>
            {order.items.map(item =>
                <li key={item.id}
                    className='py-3 border-b border-[#0b0b0b]/10 last:border-none items-center grid grid-cols-[56px_1fr_auto] gap-4'>
                    <img src={item.product.image} alt={item.product.title}
                         className='w-full h-[70px] rounded-md object-cover'/>
                    <div>
                        <h1 className='text-[13px] font-medium mb-0.5 '>{item.product.title}</h1>
                        <p className='text-[11px] text-[#898781] '>
                            {item.product.brand ?? '-'} ⋅
                            Size {item.size ?? '-'} ⋅
                            NOVA
                        </p>
                    </div>
                    <div>
                        <h2 className='mb-0.5 text-sm font-medium text-nowrap text-right'>${(item.product.price * item.quantity).toFixed(2)}</h2>
                        <p className='text-[10px] text-right text-[#898781]'>{item.quantity} x ${item.product.price.toFixed(2)}</p>
                    </div>
                </li>
            )
            }
        </ul>
    </>
}