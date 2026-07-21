import {Link, useLoaderData} from "react-router-dom";
import type {Order} from "../../../types/Order.ts";
import FormatDate from "../../../components/ui/FormatDate.tsx";
import Status from "../sections/Status.tsx";


export default function Orders() {
    const {orders} = useLoaderData();
    console.log("Orders loaded", orders);
    const totalSpent = orders.reduce((prev: number, curr: Order) => prev + curr.paid, 0)
    const totalItems = orders.reduce(
        (sum: number, order: Order) =>
            sum +
            order.items.reduce(
                (itemSum, item) => itemSum + item.quantity,
                0
            ),
        0
    );
    return <>
        <div className='grid grid-cols-3 gap-3 mb-5'>
            <div className='bg-[#fcfcfb] p-4 rounded-lg'>
                <p className='text-xs pb-1 text-[#898781]'>Total orders</p>
                <h1 className='text-xl font-medium'>{orders.length}</h1>
            </div>
            <div className='bg-[#fcfcfb] p-4 rounded-lg'>
                <p className='text-xs pb-1 text-[#898781]'>Total spent</p>
                <h1 className='text-xl font-medium'>${totalSpent.toFixed(2)}</h1>
            </div>
            <div className='bg-[#fcfcfb] p-4 rounded-lg'>
                <p className='text-xs pb-1 text-[#898781]'>Total items purchased</p>
                <h1 className='text-xl font-medium'>{totalItems}</h1>
            </div>
        </div>
        <h1 className='text-base font-medium mb-4'>Recent orders</h1>
        <table className="w-full border-collapse text-xs">
            <thead className="border-b border-[#0b0b0b]/10">
            <tr className='text-[#898781] font-medium !text-[10px]'>
                <th className="text-left p-2 uppercase">Order</th>
                <th className="text-left p-2 uppercase">Date</th>
                <th className="text-left p-2 uppercase">ITEMS</th>
                <th className="text-left p-2 uppercase">Total</th>
                <th className="text-left p-2 uppercase">Status</th>
                <th className="text-left p-2 uppercase"></th>
            </tr>
            </thead>

            <tbody>
            {orders.map((order: Order) => (
                <tr className="border-b border-[#0b0b0b]/10" key={order.id}>
                    <td className="p-2 font-medium">#{order.orderNumber}</td>
                    <td className="p-2 text-[#52514e]">
                        <FormatDate date={order.createdAt}/>
                    </td>
                    <td className="p-2 text-[#52514e] overflow-hidden ">
                        <div className="max-w-[200px] truncate">
                        {order.items.map((it) => it.product.title).join(", ")}
                    </div></td>
                    <td className="p-2 text-[#52514e]">${order.paid.toFixed(2)}</td>
                    <td className="p-2 text-[#52514e]"><Status tracking={order.tracking}/></td>
                    <td className="p-3">
                        <Link to={`/order/${order.id}`}
                              className='underline underline-offset-2 '
                        >View</Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </>
}