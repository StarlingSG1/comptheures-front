import axios from "axios";
import getFormattedToken from "../../helpers/getFormattedToken";

export async function updateUserProfile(payload) {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_BACK_URL}/users/update`,
        payload,
        getFormattedToken()
    );
    
    return response.data
}