// Backend URL: prefer Vite env `VITE_BACKEND_URL`, fall back to localhost
const envUrl = import.meta.env.VITE_BACKEND_URL;
export const BACKEND_SERVER_URL = envUrl || "http://localhost:4001";