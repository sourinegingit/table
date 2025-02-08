import React, { useState } from "react";

const TablePaginated = ({
  headers,
  data,
  loading,
  error,
  isPaginated,
  itemsPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // محاسبه تعداد کل صفحات
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // داده‌های صفحه فعلی
  const paginatedData = isPaginated
    ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : data;

  return (
    <div className="p-4 rounded-lg shadow-lg overflow-x-auto bg-white">
      <h2 className="text-center text-xl font-bold mb-4 text-gray-700">
        لیست کاربران
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">در حال دریافت اطلاعات...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 bg-white shadow-md rounded-lg">
              <thead>
                <tr className="text-gray-700">
                  {headers.map((header, index) => (
                    <th key={index} className="py-3 px-4 border-b text-center">
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={index} className="text-center hover:bg-gray-100">
                    {headers.map((header) => (
                      <td key={header.key} className="py-3 px-4 border-b">
                        {header.key === "avatar" ? (
                          <img
                            src={item[header.key]}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full mx-auto border border-gray-400"
                          />
                        ) : (
                          item[header.key]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* صفحه‌بندی */}
          {isPaginated && totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 mx-1 border rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                قبلی
              </button>
              <span className="px-4 py-2">
                {currentPage} از {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 mx-1 border rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                بعدی
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TablePaginated;
