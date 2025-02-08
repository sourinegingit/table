import React, { useState, useEffect } from "react";
import { fetchUsers } from "./components/api/api";
import TableComponent from "./components/table/Table";
import TablePaginated from "./components/table/TablePaginated";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const userData = await fetchUsers();
        console.log("داده‌های دریافت شده:", userData); // بررسی مقدار داده‌ها
        setUsers(userData);
      } catch (error) {
        setError("خطا در دریافت اطلاعات کاربر");
      }
      setLoading(false);
    };
    getUsers();
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

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

  const headers = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Avatar", key: "avatar" },
    { label: "Actions", key: "actions" },
  ];

  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center bg-gray-200 p-6">
        {/* مسیرها */}
        <Routes>
          <Route
            path="/"
            element={
              <TableComponent
                headers={headers}
                data={tableData}
                loading={loading}
                error={error}
              />
            }
          />
          <Route
            path="/page"
            element={
              <TablePaginated
                headers={headers}
                data={tableData}
                loading={loading}
                error={error}
                isPaginated={true}
                itemsPerPage={4}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
