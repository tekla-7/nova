import Panel from "../../../components/ui/Panel.tsx";
import {Star} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../store";
import {filterActions} from "../../../store/filter-slice.tsx";
import Checkbox from "../../../components/ui/Checkbox";

export default function RatingFilter() {
    const dispatch = useDispatch();
    const rating = useSelector((state: RootState) => state.filter.rating)

    function onratechange(rate: number) {
        dispatch(filterActions.changeRating(rate));
    }

    return <Panel title='Category' hasBorder={false}>
        <ul className='mb-2.5'>
            {[5, 4, 3, 2, 1].map(el =>
                <RatingCheckbox key={el} index={el} onChange={() => onratechange(el)}
                                checked={rating === el}></RatingCheckbox>)
            }</ul>
    </Panel>

}

function RatingCheckbox({index, onChange, checked}: { index: number, onChange: () => void, checked: boolean }) {
    const array = Array.from({length: index}, (_, i) => i);
    return <li className='mb-1.5 cursor-pointer flex items-center gap-2'>
        <Checkbox onChange={onChange} value={index} id={index.toString()}
               checked={checked}

        />
        <label className='cursor-pointer text-[#4A4A4A] text-xs flex items-center ' htmlFor={index.toString()}>
            {array.map(el =>
                <Star key={el} size='11px' className='fill-yellow-400 text-yellow-400'/>
            )}
            {index !== 5 && <span className='ml-2 text-[#9A9A9A] text-[10px] '>& up</span>}
        </label>
    </li>
}