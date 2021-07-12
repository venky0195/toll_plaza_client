import axios from "axios";
import config from "../config";

export const payToll = (data) => {
    return axios.post(`${config.API_URL}/add`, data);
}
export const verifyReceipt = (receiptNo) => {
    return axios.get(`${config.API_URL}/verifyReceipt/${receiptNo}`);
}