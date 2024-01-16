

export default async function useResponse({  method, path , exec }: any):
    Promise<() => Promise<{ status: string; isSuccess: boolean }>> {

    let response: any = {};

    if (typeof exec === 'function') {
        return exec()
            .then((requestHTTP: any) => {
                if (typeof requestHTTP === 'object') {
                    if (!requestHTTP.errors) {
                        response.status = requestHTTP.status || 200;
                        response.data = requestHTTP.data || requestHTTP;
                        response.isSuccess = true;
                    } else {
                        if (!requestHTTP.status) requestHTTP.status = 403;
                        response.errors = requestHTTP.errors;
                        response.isSuccess = false;
                    }
                } else {
                    response.status = 200;
                    response.data = requestHTTP;
                    response.isSuccess = true;
                }
                console.log('◄◄◄',method.toUpperCase(), path, response);
                return response;
            })
            .catch((e: any) => {
                console.error(e);
                response.data = e.response.data;
                response.status = e.response.status;
                response.isSuccess = false;
                console.log(method.toUpperCase(), path, response);
                return response;
            });
    }
    else {
        console.error('Request function is not a function');
        return async () => {
            return {
                status: '???',
                isSuccess: false,
            }
        }
    }
}
