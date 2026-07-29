import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMutation } from '@tanstack/react-query';

import { useCartMutation } from './useCartMutation.ts';
import {queryClient} from "../../routes/router.tsx";
import {QUERY_KEYS} from "../../constants/queryKeys.ts";
vi.mock('@tanstack/react-query', async () => {
    const actual = await vi.importActual('@tanstack/react-query');

    return {
        ...actual,
        useMutation: vi.fn(),
    };
});
vi.mock("react-redux", () => ({
    useDispatch: () => vi.fn(),
}))
describe('useCartMutation', () => {
    it('converts wishlist products and calls mutate',()=>{
        const mutate = vi.fn();
        vi.mocked(useMutation).mockReturnValue({
            mutate,
        } as any);
        const { result } = renderHook(() => useCartMutation());

        const products = [
            {
                productId: 1,
                title: 'Nike Shoes',
                price: 100,
                brand: 'Nike',
                image: 'nike.jpg',
            },
        ];


        act(() => {
            result.current.addWishlistToCartHandler(products);
        });

        expect(mutate).toHaveBeenCalledWith([
            {
                product: {
                    productId: 1,
                    title: 'Nike Shoes',
                    price: 100,
                    brand: 'Nike',
                    image: 'nike.jpg',
                },
                quantity: 1,
                size: expect.any(String),
                color: expect.any(String),
            },
        ]);




    })
    it('invalidates user cart query on success', async () => {
        const invalidateSpy = vi
            .spyOn(queryClient, "invalidateQueries")
            .mockResolvedValue(undefined);
        let mutationOptions: any;
        vi.mocked(useMutation).mockImplementation((options: any) => {
            mutationOptions = options;

            return {
                mutate: vi.fn(),
            } as any;
        });
        renderHook(() => useCartMutation());

        await mutationOptions.onSuccess();
        expect(invalidateSpy).toHaveBeenCalledWith({
            queryKey: QUERY_KEYS.CART,
            refetchType: "all",
        });

    })
})