import {apiJson} from "../utils/apiClient.ts";
import type {LocationOption} from "../types/user.ts";

export const fetchCountries = async () => {
    return apiJson<LocationOption[]>(`reference-data/countries`);

}
export const fetchState = async (code: string) => {
    return apiJson<LocationOption[]>(`reference-data/states/${code}`);
}
export const fetchCity = async (cCode: string, sCode: string) => {
    return apiJson<LocationOption[]>(`reference-data/city/${cCode}/${sCode}`);


}

