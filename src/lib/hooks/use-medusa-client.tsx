import { medusaClient } from "@lib/config"
import { useState } from "react";
type RequestMethod = "DELETE" | "POST" | "GET";
type ClientError = {
    message:string
} | null

export class PaginateResponse<T> {
    data:T[]=[];
    page:number = 1;
    limit:number = 20;
}

interface MedusaClienProps<T> {
    onfulfilled?:(response:T) => void,
    onrejected?:(err:ClientError) => void
};

function useMedusaClient<T>(options?:MedusaClienProps<T>) {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<ClientError>(null)
    const sendRequest = (method: RequestMethod, path:string, payload?:any) => {
        setIsLoading(true);
        setData(null);
        setError(null);
        return medusaClient.client.request(method,path,payload)
        .then((response)=> {
            setData(response);
            if(options?.onfulfilled) options.onfulfilled(response);
        })
        .catch(err=> {
            setError(err.response.data as ClientError);
            if(options?.onrejected) options.onrejected(err.response.data as ClientError);
        })
        .finally(()=>setIsLoading(false))
    }

    return {isLoading, data, error, sendRequest};
}

export const ClientErrorDispaly = ({error}:{error:ClientError}) => {
    return <>
    {error ? (<div className='text-small-regular bg-red-100 text-red-800 border border-red-800 p-2 mt-4'>{error.message}</div>) : ""}
    </>
}

export default useMedusaClient;