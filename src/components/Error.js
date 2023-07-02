import { useRouteError } from "react-router-dom"; 

const Error = () => {
    const error = useRouteError();
    const {status, statusText} = error;
    return (
        <div>
            <h1>Ooops, Something went wrong!!!</h1>
            <h2>{status} : {statusText} </h2>
        </div>
    )
}


export default Error;