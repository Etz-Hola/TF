// DataTable.js
import React from 'react';

const DataTable = ({ data, onEdit, onSave }) => {
  
  return (


    <div className="overflow-x-auto">
      <table className="table-auto min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
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
            ways
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
            firstclassPrice
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            StanderdPrice
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            availableSeats
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            returnTimeFromArrivalStation
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            StanderdPrice
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            returnTimeFromArrivalStation
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            arrivalTimeDepartureStation
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            eddit
            </th>
            {/* Add more header columns as needed */}
           
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            
            <tr key={item._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.trainId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.nameOrNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.departureStation}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.ways}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.types}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.arrivalStation}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.departureTime}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.arrivalTime}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.duration}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.firstclassPrice}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.StanderdPrice}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.availableSeats}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.returnTimeFromArrivalStation}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.arrivalTimeDepartureStation}
              </td>
              {/* Add more cells for other data */}

              <td>
                {item.editable ? (
                  <input
                    type="text"
                    value={item.trainId}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].trainId = e.target.value;
                      setTrainData(newData);
                    }}
                  />
                ) : (
                  item.trainId
                )}
              </td>
              {/* Render other table data cells */}
              <td>
                {item.editable ? (
                  <>
                    <button onClick={() => onSave(index)}>Save</button>
                    <button onClick={() => onEdit(index)}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => onEdit(index)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
