import {useLoaderData} from "react-router-dom";
import {Dot} from 'lucide-react';
import Rating from "../../../components/ui/Rating.tsx";
import Price from "../../../components/ui/Price.tsx";
import Color from "../../../components/ui/Color.tsx";
import {useState} from "react";
import Size from "../../../components/ui/Size.tsx";
import Quantity from "../../../components/ui/Quantity.tsx";
import BaseButton from "../../../components/ui/BaseButton.tsx";
import {useMutation} from "@tanstack/react-query";
import {addToCart, addToWishlist} from "../../../utils/http.ts";
import type {Product} from "../../../types/product.ts";
import {queryClient} from "../../../routes/router";
import {useUserWishlist} from "../../../hooks/useUserData.ts";


export default function Info() {
    const productDetails = useLoaderData() as Product;
    const [selectedOptions, setSelectedOptions] = useState({
            color: '#1A1A1A',
            size: 'xs',
            quantity: 1
        }
    );
    const {data: wishlist = []} = useUserWishlist();
    const isInWishlist = wishlist.some(el => el.productId === productDetails.id)

    function onSelectedOptions(type: string, value: string | number) {
        setSelectedOptions(old => ({
            ...old,
            [type]: value
        }))
    }

    const cartMutation = useMutation({
        mutationFn: addToCart,
    });

    const wishlistMutation = useMutation({
        mutationFn: addToWishlist,
    });

    function handleAddToCart() {
        cartMutation.mutate([{
                product: {
                    productId: productDetails.id,
                    title: productDetails.title,
                    price: productDetails.price,
                    brand: productDetails.brand || '-',
                    image: productDetails.images[0],
                },
                quantity: selectedOptions.quantity,
                size: selectedOptions.size,
                color: selectedOptions.color,
            }],
            {
                onSuccess: (data) => {
                    console.log("success", data);
                    queryClient.invalidateQueries({queryKey: ['userCartData'], refetchType: "all"})
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

    function handleAddToWishlist() {
        wishlistMutation.mutate({
            productId: productDetails.id,
            title: productDetails.title,
            price: productDetails.price,
            brand: productDetails.brand || '-',
            image: productDetails.images[0],
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['userWishlist'] ,refetchType: "all"}).then(() => console.log("invalidation completed"))
            }
        })
    }

    return (<div className='w-full'>
        <div
            className='flex items-center text-[#9A9A9A] uppercase text-[11px] mb-1.5 tracking-widest'>{productDetails.category}
            <Dot/>
            Nova
        </div>
        <div className='text-2xl mb-2.5 mt-4'>
            {productDetails.title}
        </div>

        <Rating rating={productDetails.rating} reviewCount={productDetails.reviews.length} showFullRatingInfo={true}/>
        <div className='mt-3.5 mb-4'>
            <Price price={productDetails.price} discountPercentage={productDetails.discountPercentage} type='dark'
                   size='large' showDiscountBadge={true}/>
        </div>
        {productDetails.stock <= 20 && <div className='flex items-center gap-1.5 mb-4 text-xs '>
            <div className='bg-[#2B8A3E] w-2 h-2 rounded-full mt-0.5'></div>
            <p className='text-[#2B8A3E]'>In stock</p>
            <p className='text-[#9A9A9A]'>· Only {productDetails.stock} left</p>
        </div>}
        <Color selectedColor={selectedOptions.color}
               onSelectedColorChange={(color: string) => onSelectedOptions('color', color)}/>
        <Size selectedSize={selectedOptions.size}
              onSelectedSizeChange={(size: string) => onSelectedOptions('size', size)}/>
        <Quantity selectedQuantity={selectedOptions.quantity} size='small'
                  onSelectedQuantityChange={(quantity: number) => onSelectedOptions('quantity', quantity)}/>
        <div className='flex flex-col gap-2.5 mt-3'>
            <BaseButton onClick={handleAddToCart} size='large' type='button'
                        variant='dark'>{cartMutation.isPending ? "Adding..." : "Add to cart"}
            </BaseButton>
            <BaseButton onClick={handleAddToWishlist} size='large' variant='transparent' disable={isInWishlist}>
                {!isInWishlist && <>Save to wishlist</>}
                {isInWishlist && <span className='text-green-700'>✓ In your wishlist</span>}
            </BaseButton>
        </div>


    </div>)
}