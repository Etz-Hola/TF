import React from "react";


const DataTable = ({ data, onEdit, onSave, setTrainData, onDelete }) => {
  const handleInputChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setTrainData(newData);
  };

  const handleEdit = (index) => {
    onEdit(index);
  };

  const handleSave = (index) => {
    onSave(index);
  };

  const handleDelete = (index) => {
    onDelete(index);
  };

  

 

  return (
    
    <div className="overflow-x-auto">
      <table className="table-auto min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 mw-[6]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Train ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name/Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Departure Station
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ways
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Types
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Arrival Station
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Duration
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Firstclass Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Standard Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Available Seats
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Return Time From Arrival Station
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Arrival Time Departure Station
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Edit
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={item._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.editable ? (
                  <input
                    type="text"
                    value={item.trainId}
                    onChange={(e) => handleInputChange(index, "trainId", e.target.value)}
                  />
                ) : (
                  item._id
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.editable ? (
                  <input
                    type="text"
                    value={item.nameOrNumber}
                    onChange={(e) => handleInputChange(index, "nameOrNumber", e.target.value)}
                  />
                ) : (
                  item.nameOrNumber
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.editable ? (
                  <input
                    type="text"
                    value={item.departureStation}
                    onChange={(e) => handleInputChange(index, "departureStation", e.target.value)}
                  />
                ) : (
                  item.departureStation
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.editable ? (
                  <input
                    type="text"
                    value={item.ways}
                    onChange={(e) => handleInputChange(index, "ways", e.target.value)}
                  />
                ) : (
                  item.ways
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.editable ? (
                  <input
                    type="text"
                    value={item.types}
                    onChange={(e) => handleInputChange(index, "types", e.target.value)}
                  />
                ) : (
                  item.ways
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.editable ? (
                  <input
                    type="text"
                    value={item.arrivalStation}
                    onChange={(e) => handleInputChange(index, "arrivalStation", e.target.value)}
                  />
                ) : (
                  item.arrivalStation
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.editable ? (
                  <input
                  type="text"
                  value={item.duration}
                  onChange={(e) => handleInputChange(index, "duration", e.target.value)}
                />
              ) : (
                item.duration
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.editable ? (
                <input
                  type="text"
                  value={item.firstclassPrice}
                  onChange={(e) => handleInputChange(index, "firstclassPrice", e.target.value)}
                />
              ) : (
                item.firstclassPrice
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.editable ? (
                <input
                  type="text"
                  value={item.StanderdPrice}
                  onChange={(e) => handleInputChange(index, "StanderdPrice", e.target.value)}
                />
              ) : (
                item.StandardPrice
              )}
            </td> 
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.editable ? (
                <input
                  type="text"
                  value={item.availableSeats}
                  onChange={(e) => handleInputChange(index, "availableSeats", e.target.value)}
                />
              ) : (
                item.availableSeats
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.editable ? (
                <input
                  type="text"
                  value={item.returnTimeFromArrivalStation}
                  onChange={(e) => handleInputChange(index, "returnTimeFromArrivalStation", e.target.value)}
                />
              ) : (
                item.returnTimeFromArrivalStation
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.editable ? (
                <input
                  type="text"
                  value={item.arrivalTimeDepartureStation}
                  onChange={(e) => handleInputChange(index, "arrivalTimeDepartureStation", e.target.value)}
                />
              ) : (
                item.arrivalTimeDepartureStation
              )}
            </td>
            <td>
              {item.editable ? (
                <>
                  <button onClick={() => handleSave(index)}>Save</button>
                  <button onClick={() => handleEdit(index)}>Cancel</button>
                </>
              ) : (
                <button onClick={() => handleEdit(index)}>Edit</button>
              )}
            </td>
            <td>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default DataTable;

