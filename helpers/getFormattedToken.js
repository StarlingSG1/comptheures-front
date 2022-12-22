
export default function getFormatedToken(
  contentType = false,
  jsonData = false
) {
    const token = localStorage.getItem("comptheures-token");

  if (token && !contentType && !jsonData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  } else if (token && contentType && !jsonData) {
    return {
      headers: {
        "Content-Type": "multipart/form-data; boundary=something",
        Authorization: `Bearer ${token}`,
      },
    };
  } else if (token && !contentType && jsonData) {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  }
}