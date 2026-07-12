import Panel from "../../../components/ui/Panel.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../store";
import {filterActions} from "../../../store/filter-slice.tsx";

export default function PriceRangeFilter() {
    const dispatch = useDispatch();
    const minPrice = useSelector((state: RootState) => state.filter.minPrice)
    const maxPrice = useSelector((state: RootState) => state.filter.maxPrice)

    function onMaxPriceChange(price: number) {
       dispatch(filterActions.changeMaxPrice(price));


    }
    function onMinPriceChange(price: number) {
        dispatch(filterActions.changeMinPrice(price));
    }

    return <Panel title='Price range'>
        <div className='mb-3'>
            <div className='flex items-center gap-2 mb-2'>
                <div className="relative h-9 rounded-md border border-[#E5E0D8]">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0b0b0b]">$</span>
                    <input
                        value={minPrice}
                        onChange={(e) => {
                            const val = Math.min(Number(e.target.value),maxPrice - 1);
                            onMinPriceChange(val)
                        }
                        }
                        className="w-full h-full pl-7 pr-3 border-none outline-none focus:outline-none focus:ring-0"/>
                </div>
                <div className="relative h-9 rounded-md border border-[#E5E0D8]">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0b0b0b]">$</span>
                    <input
                        value={maxPrice}

                        onChange={(e) => {
                            const val = Math.max(Number(e.target.value), minPrice + 1);
                            onMaxPriceChange(val)
                        }}
                        className="w-full h-full pl-7 pr-3 border-none outline-none focus:outline-none focus:ring-0"/>
                </div>
            </div>
            <div className="flex flex-col gap-2.5 mt-0.5">
                <input
                    type="range"
                    className='h-1 rounded accent-black bg-[#00000014] appearance-none border-0 outline-none'
                    min={0}
                    max={1000}
                    value={minPrice}
                    onChange={(e) => {
                        const val = Math.min(Number(e.target.value),maxPrice - 1);
                        onMinPriceChange(val)
                    }
                    }
                />

                <input
                    type="range"
                    className='h-1 rounded accent-black bg-[#00000014] appearance-none border-0 outline-none'
                    min={0}
                    max={1000}
                    value={maxPrice}
                    onChange={(e) => {
                        const val = Math.max(Number(e.target.value), minPrice + 1);
                        onMaxPriceChange(val)
                    }}
                />
            </div>

        </div>

    </Panel>
}