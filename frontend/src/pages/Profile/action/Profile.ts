import {fetchUser} from "../../../services/user.api.ts";
import ApiError from "../../../models/error.ts";
import {signOut} from "../../../services/auth.service.ts";

export async function loader() {

    try {
        return {
            user: await fetchUser(),
            error: null,
        };
    } catch (error) {
        if (error instanceof ApiError && error.code === 401) {
            await signOut();
            return
        }
        return {
            orders: null,
            error: {
                message: error instanceof Error
                    ? error.message
                    : "Something went wrong",
            },
        };

    }
}