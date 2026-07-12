import type {Addresses} from "../../../../types/user.ts";
import {type ChangeEvent, useEffect, useState} from "react";
import {fetchCity, fetchCountries, fetchState} from "../../../../utils/http.ts";

type Data = { name: string, code: string }
export default function CountryCitySelect({address}: { address: Addresses | null}) {
    const [countries, setCountries] = useState<Data[]>([]);
    const [states, setStates] = useState<Data[]>([]);
    const [cities, setCities] = useState<Data[]>([]);
    const [selected, setSelected] = useState<{ country: Data|null, state: Data|null, city: Data|null }>({
        country: null,
        state: null,
        city: null
    });

    useEffect(() => {
        async function initCountries() {
            const res = await fetchCountries();
            if (!res) return;
            setCountries(res);
        }
        void initCountries();
    }, []);
    useEffect(() => {
        if (!address?.country || countries.length === 0 || selected.country) return;
        const foundCountry = countries.find(
            (c: Data) => c.code.toLowerCase() === address.country?.code.toLowerCase()
        );
        if (foundCountry) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelected(prev => ({...prev, country: foundCountry}));
        }
    }, [address?.country, countries]);
    useEffect(() => {
        if (!selected.country) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setStates([]);
            return;
        }

        async function loadStates() {
            if(!selected.country) return;
            const res = await fetchState(selected.country.code);
            if (!res) return;
            setStates(res);

            if (address?.state && !selected.state) {
                const foundState = res.find((s: Data) => s.code.toLowerCase() === address.state?.code.toLowerCase());
                if (foundState) {
                    setSelected(prev => ({...prev, state: foundState}));
                }
            }
        }
        void loadStates();
    }, [selected.country, address?.state]);
    useEffect(() => {
        if (!selected.country|| !selected.state) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCities([]);
            return;
        }

        async function loadCities() {
            const res = await fetchCity(selected.country!.code, selected.state!.code);
            if (!res) return;
            setCities(res);

            if (address?.city && !selected.city) {
                const foundCity = res.find((c: Data) => c.name.toLowerCase() === address.city.name?.toLowerCase());
                console.log(address.city?.name.toLowerCase() )
                if (foundCity) {
                    setSelected(prev => ({...prev, cityCode: foundCity.code}));
                }
            }
        }
        void loadCities();
    }, [selected.country, selected.state, address?.city]);

    const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const valueStr = e.target.value;
        const countryObj = JSON.parse(valueStr);
        if (!valueStr) {
            setSelected(prev => ({ ...prev, country: null}));
            return;
        }
        setSelected({country: countryObj, state: null, city:null});
    };

    const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const valueStr = e.target.value;
        const stateObj = JSON.parse(valueStr);
        if (!valueStr) {
            setSelected(prev => ({ ...prev, state: null }));
            return;
        }
        setSelected(prev => ({...prev, state: stateObj, city:null}));
    };
    const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const valueStr = e.target.value;
        if (!valueStr) {
            setSelected(prev => ({ ...prev, city: null }));
            return;
        }
        const cityObj = JSON.parse(valueStr);
        setSelected(prev => ({ ...prev, city: cityObj }));
    };
    return <>
        <div className='flex flex-col gap-1 mb-2'>
            <label htmlFor='city' className='text-[11px] font-medium'>City
            </label>
            <select
                value={selected.country ? JSON.stringify(selected.country) : ""}
                onChange={handleCountryChange}
                name='country'
                id='country'
                required
                className='text-base border  border-[#0b0b0b]/10 rounded-md outline-none transition-all w-full h-9 px-3 flex items-center bg-[#ffffff]'
            >
                <option value="">select country</option>
                {countries.map((c) => (
                    <option key={c.name} value={JSON.stringify(c)}>{c.name}</option>
                ))}
            </select>

        </div>
        <div className='flex flex-col gap-1 mb-2'>
            <label htmlFor='state' className='text-[11px] font-medium'>State</label>
            <select
                value={selected.state ? JSON.stringify(selected.state) : ""}
                onChange={handleStateChange}
                disabled={!selected.country || states.length === 0}
                name='state'
                id='state'
                required
                className='text-base border border-[#0b0b0b]/10 rounded-md outline-none transition-all w-full h-9 px-3 flex items-center bg-[#ffffff] disabled:bg-neutral-50 disabled:text-neutral-400'
            >
                <option value="">
                    {!selected.country ? 'first select country' : states.length === 0 ? 'cannot found state' : 'select state'}
                </option>
                {states.map((s) => (
                    <option key={s.name} value={JSON.stringify(s)}>{s.name}</option>
                ))}
            </select>
        </div>
        <div className='flex flex-col gap-1 mb-2'>
            <label htmlFor='city' className='text-[11px] font-medium'>City</label>
            <select
                value={selected.city ? JSON.stringify(selected.city) : ""}
                onChange={handleCityChange}
                disabled={!selected.state || cities.length === 0}
                name='city'
                id='city'
                required
                className='text-base border border-[#0b0b0b]/10 rounded-md outline-none transition-all w-full h-9 px-3 flex items-center bg-[#ffffff] disabled:bg-neutral-50 disabled:text-neutral-400'
            >
                <option value="">
                    {!selected.state ? 'first select state' : cities.length === 0 ? 'cannot found city' : 'select city'}
                </option>
                {cities.map((c) => (
                    <option key={c.name} value={JSON.stringify(c)}>{c.name}</option>
                ))}
            </select>
        </div>
    </>
}