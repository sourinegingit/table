import React from "react";



  return (
    <div className="overflow-x-auto p-4 bg-gray-300 mx-auto mt-6">
      <table className="w-full h-full border border-gray-300 bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">نام</th>
            <th className="py-2 px-4 border-b">سن</th>
            <th className="py-2 px-4 border-b">شهر</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id} className="text-center hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{row.name}</td>
              <td className="py-2 px-4 border-b">{row.age}</td>
              <td className="py-2 px-4 border-b">{row.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
