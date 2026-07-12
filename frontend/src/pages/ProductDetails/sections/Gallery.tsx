import {useState} from "react";

export default function Gallery({images}: { images: string[] }) {
    const [selected, setSelected] = useState<string>(images[0]);
    return <div>
        <img
            className='bg-[#F5F3EE] rounded-xl mb-2.5 w-full transition-all duration-300 ease-in-out  aspect-[4/5] object-center object-contain'
            src={selected} alt=""/>
        <div className='flex gap-2 overflow-x-auto'>
            {images.map((image) => (
                <img onClick={() => setSelected(image)} key={image}
                     className={`cursor-pointer rounded-xl mb-2.5 w-[60px] transition-all duration-300 ease-in-out aspect-1 object-cover border ${selected === image ? ' border-[#0D0D0D] bg-[#EAE6DC]' : 'border-transparent bg-[#F5F3EE]'}`}
                     src={image} alt=""/>

            ))}
        </div>

    </div>
}