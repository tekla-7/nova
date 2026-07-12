import {isRouteErrorResponse, useRouteError} from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();

    console.log(error);

    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>Error {error.status}</h1>
                <p>{error.statusText}</p>
                <p>{error.data?.message}</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Something went wrong</h1>
        </div>
    );
}

export default ErrorPage;