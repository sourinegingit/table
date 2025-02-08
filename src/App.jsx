import React, { useState, useEffect } from "react";
import TableComponent from "./components/table/Table";
import TablePaginated from "./components/table/TablePaginated";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { fetchUsers, fetchUsersPaginated } from "./components/api/api";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPaginated, setIsPaginated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        if (isPaginated) {
          const { data, total_pages } = await fetchUsersPaginated(
            currentPage,
            perPage
          );
          setUsers(data);
          setTotalPages(total_pages);
        } else {
          const allUsers = await fetchUsers();
          setUsers(allUsers);
          setTotalPages(1); // No pagination in this case
        }
      } catch (error) {
        setError("خطا در دریافت اطلاعات کاربران");
      }
      setLoading(false);
    };
    getUsers();
  }, [isPaginated, currentPage, perPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const tableData = users.map((user, index) => ({
    rowNumber: index + 1 + (currentPage - 1) * perPage, // Row number based on current page
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
    { label: "ردیف", key: "rowNumber" }, // Updated header for row number
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Avatar", key: "avatar" },
    { label: "Actions", key: "actions" },
  ];

  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center bg-gray-200 p-6">
        <div className="mb-4 flex items-center space-x-4">
          <button
            onClick={() => setIsPaginated(!isPaginated)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {isPaginated ? "نمایش همه کاربران" : "فعال‌سازی صفحه‌بندی"}
          </button>

          {isPaginated && (
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="px-3 py-2 border rounded-lg bg-white text-gray-700"
            >
              <option value="3">3 کاربر در هر صفحه</option>
              <option value="5">5 کاربر در هر صفحه</option>
              <option value="10">10 کاربر در هر صفحه</option>
            </select>
          )}
        </div>

        <Routes>
          <Route
            path="/"
            element={
              isPaginated ? (
                <TablePaginated
                  headers={headers}
                  data={tableData}
                  loading={loading}
                  error={error}
                  isPaginated={true}
                  itemsPerPage={perPage}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handleNextPage={handleNextPage}
                  handlePrevPage={handlePrevPage}
                  handlePageClick={handlePageClick} // Pass the page click handler
                />
              ) : (
                <TableComponent
                  headers={headers}
                  data={tableData}
                  loading={loading}
                  error={error}
                />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
