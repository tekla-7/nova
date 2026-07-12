export default function Footer() {
    return <footer className="border-t-1 border-[#E5E0D8] pt-7 px-6 pb-5">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-5">
            <div>
                <div className="text-base mb-2 tracking-wider">NOVA</div>
                <div className="text-[#9A9A9A] text-xs leading-relaxed">
                    Modern commerce for modern people. Premium quality, curated selection, delivered fast.
                </div>
            </div>

            <div className="flex flex-col">
                <div className="text-[11px] text-[#0D0D0D] uppercase mb-2.5">Shop</div>
                <a className="text-xs text-[#4A4A4A] mb-1.5 cursor-pointer hover:text-black">New In</a>
                <a className="text-xs text-[#4A4A4A] mb-1.5 cursor-pointer hover:text-black">Women</a>
                <a className="text-xs text-[#4A4A4A] mb-1.5 cursor-pointer hover:text-black">Men</a>
                <a className="text-xs text-[#4A4A4A] mb-1.5 cursor-pointer hover:text-black">Sale</a>
            </div>

            <div className="flex flex-col">
                <div className="text-[11px] text-[#0D0D0D] uppercase mb-2.5">Help</div>
                <a className="text-xs text-[#4A4A4A] mb-1.5 cursor-pointer hover:text-black">Returns</a>
                <a className="text-xs text-[#4A4A4A] mb-1.5 cursor-pointer hover:text-black">Shipping</a>
                <a className="text-xs text-[#4A4A4A] mb-1.5 cursor-pointer hover:text-black">Sizing</a>
                <a className="text-xs text-[#4A4A4A] mb-1.5 cursor-pointer hover:text-black">Contact</a>
            </div>

            <div className="flex flex-col">
                <div className="text-[11px] text-[#0D0D0D] uppercase mb-2.5">Company</div>
                <a className="text-xs text-[#4A4A4A] mb-1.5 cursor-pointer hover:text-black">About</a>
                <a className="text-xs text-[#4A4A4A] mb-1.5 cursor-pointer hover:text-black">Careers</a>
                <a className="text-xs text-[#4A4A4A] mb-1.5 cursor-pointer hover:text-black">Press</a>
                <a className="text-xs text-[#4A4A4A] mb-1.5 cursor-pointer hover:text-black">Privacy</a>
            </div>
        </div>
        <div className="border-t border-[#E5E0D8] pt-4 flex items-center justify-between">
            <div className="text-[11px] text-[#9A9A9A]">© 2026 NOVA. All rights reserved.</div>
            <div className="flex gap-3">
                <i className="ti ti-brand-instagram text-base text color-[#9A9A9A] cursor-pointer"
                   aria-hidden="true"></i>
                <i className="ti ti-brand-twitter text color-[#9A9A9A] cursor-pointer"
                   aria-hidden="true"></i>
                <i className="ti ti-brand-tiktok text color-[#9A9A9A] cursor-pointer"
                   aria-hidden="true"></i>
            </div>
        </div>
    </footer>
}