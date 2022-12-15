export async function getFormattedToken() {
  const token = localStorage.getItem("vb-bmx-token");
  const formattedToken = `Bearer ${token}`;
  return formattedToken;
}