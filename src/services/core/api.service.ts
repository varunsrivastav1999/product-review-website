import axios, {AxiosError} from 'axios';

export class ApiService {
    private static _instance: ApiService;

    private _axiosInstance = axios.create({
        baseURL: 'https://fakestoreapi.com',
        responseType: "json",
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });

    constructor() {
        this._errorHandler = this._errorHandler.bind(this);
    }

    static getInstance(): ApiService {
        if (!ApiService._instance) {
            ApiService._instance = new ApiService();
        }
        return ApiService._instance;
    }

    get = async (path: string) => {
        return await this._axiosInstance.get(path)
            .then(res => res.data)
            .catch(this._errorHandler);
    }

    put = async (path: string, data?: { [key: string]: any }) => {
        return await this._axiosInstance.put(path, data)
            .then(res => res.data)
            .catch(this._errorHandler);
    }


    private readonly _errorHandler = (error: AxiosError) => {
        return Promise.reject(error);
    }
}
