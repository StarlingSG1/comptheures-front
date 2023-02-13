import axios from "axios";
import getFormatedToken from "../../helpers/getFormattedToken";

export async function createRole(payload) {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_BACK_URL}/admin/role/create`,
        payload,
        getFormatedToken()
    );
    return response.data;
}

