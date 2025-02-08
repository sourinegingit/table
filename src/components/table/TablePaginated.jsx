import React from "react";

const TablePaginated = ({
  headers,
  data,
  loading,
  error,
  isPaginated,
  itemsPerPage,
  currentPage,
  totalPages,
  handleNextPage,
  handlePrevPage,
  handlePageClick, // Function to handle page number click
}) => {
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
                {data.map((item, index) => (
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

          {isPaginated && totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 mx-1 border rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                قبلی
              </button>

              {/* Display page numbers */}
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageClick(index + 1)} // Pass the page number
                  className={`px-4 py-2 mx-1 border rounded-lg ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-500"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 mx-1 border rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
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
