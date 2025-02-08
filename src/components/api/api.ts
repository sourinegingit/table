import axios from "axios";
import { Base_Url } from "./base";

export const fetchUsers = async () => {
  try {
    const res = await axios.get(`${Base_Url}?page=1`);
    return res.data.data;
  } catch (error) {
    console.error("خطا در دریافت اطلاعات کاربران:", error);
    return [];
  }
};
