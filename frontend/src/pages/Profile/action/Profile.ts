import {fetchUser} from "../../../utils/http.ts";
import {isAuthenticated} from "../../../utils/auth.ts";

export  async function loader() {

    if (!isAuthenticated()) return {user: null};
    try {

        return await fetchUser()
    } catch {
        return {user: null};
    }
}