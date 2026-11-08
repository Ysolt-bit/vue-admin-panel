import axios from "axios";

const request=axios.create({
    baseURL:import.meta.env.DEV?"/api":"https://jsonplaceholder.typicode.com",
    timeout:5000
});

request.interceptors.request.use((config) => {
    console.log("[请求出发]", config.method, config.url);
    return config;
});

request.interceptors.response.use(
    (response) => {
        const type = response.headers["content-type"] || "";
        if (!type.includes("application/json")) {
            return Promise.reject(new Error("接口返回的不是 JSON，实际类型：" + type));
        }
        return response.data;
    },
    (error) => {
        console.error("[请求失败]", error.message);
        return Promise.reject(error);
    }
);

export default request;
