import express from 'express';
import {login} from "../controllers/auth.js";
import {getCity, getCountries, getState} from "../controllers/referenceDara.js";
const router = express.Router();

router.get('/countries', getCountries)
router.get('/states/:countryCode' ,getState)
router.get('/city/:countryCode/:stateCode', getCity);
export default router;