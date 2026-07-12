import {useQuery} from "@tanstack/react-query";
import {fetchShoppingMethods} from "../utils/http.ts";

export const useShoppingMethods = () => {
   return  useQuery({
        queryKey:['shoppingMethods'],
        queryFn: fetchShoppingMethods,
        staleTime: 3600000,
        retry: 2,
        refetchOnWindowFocus: false,
    })
}