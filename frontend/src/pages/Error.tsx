
import {
    isRouteErrorResponse,
    useRouteError,
    Link,
} from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>{error.status}</h1>
                <p>{error.statusText}</p>
                {error.data?.message && <p>{error.data.message}</p>}

                <Link to="/">Go Home</Link>
            </div>
        );
    }

    if (error instanceof Error) {
        return (
            <div>
                <h1>Something went wrong</h1>
                <p>{error.message}</p>

                <Link to="/">Go Home</Link>
            </div>
        );
    }

    return (
        <div>
            <h1>Unexpected error</h1>

            <Link to="/">Go Home</Link>
        </div>
    );
}
