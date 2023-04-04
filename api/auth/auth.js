import axios from "axios";

export async function loginUser(payload) {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_BACK_URL}/auth/login`,
        payload
    );
    return response.data;
}

export async function verifyToken() {
    const token = localStorage.getItem("comptheures-token");
    try {
        if (!token) {
            return false;
        }
        const response = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_BACK_URL}/auth/me`, { token: token }
        );
        return response;
    } catch (error) {
        console.log(error);
        return {error: true};
    }
}

    export async function logout() {
        localStorage.removeItem("comptheures-token");
    }

    export async function registerUser(payload) {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_LOCAL_BACK_URL}/auth/register`,
            payload
        );
        return response.data;
    }

    export async function invitationRegisterUser(payload) {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_LOCAL_BACK_URL}/invitation/register`,
            payload
        );
        return response.data;
    }

    export async function invitationLoginUser(payload) {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_LOCAL_BACK_URL}/invitation/login`,
            payload
        );
        return response.data;
    }