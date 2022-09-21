import {useRouteError, useNavigate} from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate();
    console.error(error);

    return (
        <div className={"container"}>
            <main role={"main"} className={"pb-3"}>
                <div className={"text-center"}>
                    <div id="error-page">
                        <h1>Oops!</h1>
                        <p>Sorry, an unexpected error has occurred.</p>
                        <p>
                            <i>{error.statusText || error.message}</i>
                        </p>
                        <button className={"btn btn-outline-secondary"} type="button" onClick={() => {
                            navigate(-1);
                        }}>
                            Back
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}