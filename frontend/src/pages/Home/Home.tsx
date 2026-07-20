import HeroSection from "./sections/HeroSection.tsx";
import PromoBanner from "./sections/PromoBanner.tsx";
import CategoryStrip from "./sections/CategoryStrip.tsx";
import FeaturedProducts from "./sections/FeaturedProducts.tsx";
import BestSellers from "./sections/BestSellers.tsx";
import Reviews from "./sections/Reviews.tsx";
import Subscribe from "./sections/Subscribe.tsx";

function HomePage() {
    return <section className='flex flex-col w-full'>
        <HeroSection/>
        <div className='px-6 py-5'>
            <PromoBanner />
            <CategoryStrip />
            <FeaturedProducts />
            <BestSellers/>
            <Reviews/>
            <Subscribe />
        </div>
    </section>;
}

export default HomePage;