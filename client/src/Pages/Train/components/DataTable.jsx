import React from "react";

const DataTable = ({ data, onEdit, onSave, setTrainData }) => {
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.editable ? (
                  <input
                    type="text"
                    value={item.nameOrNumber}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].nameOrNumber = e.target.value;
                      setTrainData(newData);
                    }}
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
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].departureStation = e.target.value;
                      setTrainData(newData);
                    }}
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
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].ways = e.target.value;
                      setTrainData(newData);
                    }}
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
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].types = e.target.value;
                      setTrainData(newData);
                    }}
                  />
                ) : (
                  item.types
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.editable ? (
                  <input
                    type="text"
                    value={item.arrivalStation}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].arrivalStation = e.target.value;
                      setTrainData(newData);
                    }}
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
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].duration = e.target.value;
                      setTrainData(newData);
                    }}
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
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].firstclassPrice = e.target.value;
                      setTrainData(newData);
                    }}
                  />
                ) : (
                  item.firstclassPrice
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.editable ? (
                  <input
                    type="text"
                    value={item.standardPrice}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].standardPrice = e.target.value;
                      setTrainData(newData);
                    }}
                  />
                ) : (
                  item.standardPrice
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.editable ? (
                  <input
                    type="text"
                    value={item.availableSeats}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].availableSeats = e.target.value;
                      setTrainData(newData);
                    }}
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
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].returnTimeFromArrivalStation =
                        e.target.value;
                      setTrainData(newData);
                    }}
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
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].arrivalTimeDepartureStation =
                        e.target.value;
                      setTrainData(newData);
                    }}
                  />
                ) : (
                  item.arrivalTimeDepartureStation
                )}
              </td>
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
