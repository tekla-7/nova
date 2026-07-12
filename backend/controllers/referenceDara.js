import {State ,Country, City} from "country-state-city";


export async function getCountries(req, res) {
    const allCountries = Country.getAllCountries().map(country => ({
            code: country.isoCode,
            name: country.name
        })
    )
    res.json(allCountries);
}

export const getCity = async (req, res) => {
    const { countryCode, stateCode } = req.params;

    const stateCities = City.getCitiesOfState(countryCode, stateCode).map(c => ({
        code: '',
        name: c.name
    }))

    if (!stateCities || stateCities.length === 0) {
        res.status(404).json({
            message: 'Cannot found city with this country',
        });
    }

    res.json(stateCities);

}
export  const getState = async (req, res) => {
    const countryCode = req.params.countryCode;
    const countryStates = State.getStatesOfCountry(countryCode.toUpperCase()).map(s => ({
        code: s.isoCode,
        name: s.name
    }))

    if (!countryStates || countryStates.length === 0) {
        res.status(404).json({
            message: 'Cannot found state with this country',
        });
    }
    res.json(countryStates);
}