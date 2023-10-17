import { toast } from "react-toastify";
import { ErrorInfo } from "./Types";

export const baseURL: string = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;


// Can't name a method `get`, so ...
export const getJSON = <T>(url: string, params?: any): Promise<T> => {
    if (!url.startsWith("/")) {
        url = "/" + url;
    }
    let qm = url.includes("?");
    for (const key in params || {}) {
        if (!qm) {
            url += "?";
            qm = true;
        } else {
            url += "&";
        }
        url += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    }
    return fetch(baseURL + url)
        .then(body => {
            if (body.status !== 200) {
                throw body;
            }
            return body.json()
        })
        .then(e => e as T);
}

export const post = (url: string, body?: any, params?: any): Promise<Response> => {
    if (!url.startsWith("/")) {
        url = "/" + url;
    }
    let qm = url.includes("?");
    for (const key in params || {}) {
        if (!qm) {
            url += "?";
            qm = true;
        } else {
            url += "&";
        }
        url += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    }
    let describe: RequestInit = {
        method: "POST",
    }
    if (body) {
        describe = {
            ...describe,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }
    }
    return fetch(baseURL + url, describe)
        .then(response => {
            if (response.status !== 200) {
                throw response;
            }
            return response;
        });
}

export const patch = (url: string, body?: any, params?: any): Promise<Response> => {
    if (!url.startsWith("/")) {
        url = "/" + url;
    }
    let qm = url.includes("?");
    for (const key in params || {}) {
        if (!qm) {
            url += "?";
            qm = true;
        } else {
            url += "&";
        }
        url += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    }
    let describe: RequestInit = {
        method: "PATCH",
    }
    if (body) {
        describe = {
            ...describe,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }
    }
    return fetch(baseURL + url, describe)
        .then(response => {
            if (response.status !== 200) {
                throw response;
            }
            return response;
        });
}

//can't name function `delete` 😞
export const apiDelete = (url: string, params?: any): Promise<Response> => {
    if (!url.startsWith("/")) {
        url = "/" + url;
    }
    let qm = url.includes("?");
    for (const key in params || {}) {
        if (!qm) {
            url += "?";
            qm = true;
        } else {
            url += "&";
        }
        url += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    }
    return fetch(baseURL + url, {
        method: "DELETE"
    })
        .then(response => {
            if (response.status !== 200) {
                throw response;
            }
            return response;
        });
}

export const toastError = (message: string) => (resp: any) => {
    resp.json()
        .then((error: ErrorInfo) =>
            toast.error(`${message}: ${error.message}`, {
                theme: "colored"
            }))
}
