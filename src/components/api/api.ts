import axios from "axios";
import { Base_Url } from "./base";

// دریافت داده‌های صفحه‌بندی‌شده (API)
//ما گفتیم چند صفحه پیجینیشن کن
export const fetchUsersPaginated = async (page = 1, perPage = 3) => {
  try {
    const res = await axios.get(`${Base_Url}?page=${page}&per_page=${perPage}`);
    return res.data;
  } catch (error) {
    console.error("خطا در دریافت اطلاعات کاربران:", error);
    return { data: [], total_pages: 1 };
  }
};

// دریافت همه داده‌ها (بدون صفحه‌بندی)
export const fetchUsers = async () => {
  try {
    const res = await axios.get(`${Base_Url}?per_page=100`); // دریافت تمام کاربران
    return res.data.data;
  } catch (error) {
    console.error("خطا در دریافت اطلاعات کاربران:", error);
    return [];
  }
};
