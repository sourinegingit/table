import React from "react";

const TableComponent = ({ headers, data, loading, error }) => {
  return (
    <div className="p-4 rounded-lg shadow-lg overflow-x-auto border-2">
      <h2 className="text-center text-xl font-bold mb-4 text-gray-700">
        لیست کاربران
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">در حال دریافت اطلاعات...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
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
                      {/* نمایش آواتار */}
                      {header.key === "avatar" ? (
                        <img
                          src={item[header.key]}
                          alt="Avatar"
                          className="w-10 h-10 rounded-full mx-auto border border-gray-400"
                        />
                      ) : (
                        item[header.key] // نمایش مقدار سایر ستون‌ها
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
