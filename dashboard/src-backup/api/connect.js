import axios from 'axios'
const ENDPOINT = 'http://127.0.0.1:8001';

// import { data } from 'jquery';
export async function getAllProduct() {
    try {
        const response = await axios.get(`${ENDPOINT}/admin/san-pham/du-lieu`);
        return response.data
    } catch (error) {
        console.log(error);
    }
}
export async function getAllCategories() {
    try {
        const response = await axios.get(`${ENDPOINT}/admin/the-loai/du-lieu`);
        return response.data
    } catch (error) {
        console.log(error);
    }
}
export async function login(entity) {
    try {
        const response = await axios.post(`${ENDPOINT}/api/login`, entity);
        return response.data
    } catch (error) {
        console.log("Đăng nhập thất bại", error);
    }
}
export async function updatePassword(entity) {
    try {
        const response = await axios.post(`${ENDPOINT}/api/edit`, entity);
        return response.data
    } catch (error) {
        console.log("Đăng nhập thất bại", error);
    }
}
export async function updateProfile(entity) {
    try {
        const response = await axios.post(`${ENDPOINT}/api/update-user`, entity, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data
    } catch (error) {
        console.log("Đăng nhập thất bại", error);
    }
}
export async function detailUser(entity) {
    try {
        const response = await axios.post(`${ENDPOINT}/api/detail`, entity);
        return response.data
    } catch (error) {
        console.log("Đăng nhập thất bại", error);
    }
}
export async function register(entity) {
    try {
        const response = await axios.post(`${ENDPOINT}/api/register`, entity);
        return response.data
    } catch (error) {
        console.log(error);
    }
}