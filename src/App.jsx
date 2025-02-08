import React, { useEffect, useState } from "react";
import TableComponent from "./components/table/Table";
import { fetchUsers } from "./components/api/api";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const userData = await fetchUsers();
        setUsers(userData);
      } catch (error) {
        setError("خطا در دریافت اطلاعات کاربر");
      }
      setLoading(false);
    };
    getUsers();
  }, []);

  // تابع حذف کاربر
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // داده‌های جدول را به آبجکت تبدیل می‌کنیم
  const tableData = users.map((user) => ({
    id: user.id,
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    avatar: user.avatar,
    actions: (
      <button
        onClick={() => handleDelete(user.id)}
        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
      >
        حذف
      </button>
    ),
  }));

  // هدرهای جدول
  const headers = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Avatar", key: "avatar" },
    { label: "Actions", key: "actions" },
  ];

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-400 p-4">
      <div className="w-full max-w-4xl p-6 bg-gray-300 rounded-lg shadow-lg">
        <TableComponent
          headers={headers}
          data={tableData} // ارسال داده به صورت آرایه‌ای از آبجکت‌ها
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}

export default App;
