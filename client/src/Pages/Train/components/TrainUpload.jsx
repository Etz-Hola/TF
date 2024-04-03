import React, { useState, useEffect } from "react";
import SidebarWithHeader from "../../../SidebarWithHeader";
import { Input, Button } from "@material-tailwind/react";
import { useAxiosInstance } from "../../../../api/axios";
import useShowToast from "../../../hooks/useShowToast";
import { Select } from "@chakra-ui/react";
// import { Select, Option } from "@material-tailwind/react";
import { Navigate, useNavigate } from "react-router-dom";


const TrainUpload = () => {
  const user = JSON.parse(localStorage.getItem('ticket-flow'))
  console.log(user)
  const [transportDetails, setTransportDetails] = useState({
    nameOrNumber: "",
    departureStation: "",
    ways: "",
    // types: "",
    firstclassPrice: "",
    StanderdPrice: "",
    arrivalStation: "",
    departureTime: "",
    arrivalTime: "",
    duration: "",
    availableSeats: "",
    returnTimeFromArrivalStation: "",
    arrivalTimeDepartureStation: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosInstance = useAxiosInstance();
  const [isValid, setIsValid] = useState(false);
  const showToast = useShowToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Validation logic
    const isValid = Object.values(transportDetails).every(value => value.trim().length > 0);
    setIsValid(isValid);
  }, [transportDetails]);


  const handleChange = (e) => {
    // console.log(e)
    const { name, value } = e.target;
    console.log(name)
    setTransportDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Assuming you have the company ID stored in localStorage or state
    const companyDetails = JSON.parse(localStorage.getItem('ticket-flow')); // Adjust this according to how you store the company ID
    const companyId = companyDetails.result._id

    //Submit logic
    console.log(companyDetails)
    try {
      //Your submit logit here
      const res = await axiosInstance.post(
        `/company/upload-train?companyId=${companyId}`,
        JSON.stringify(transportDetails)

      );
      const data = res.data;
      console.log(data);

      if (data.error) {
        showToast("Error", data.error, "error");
      } else {
        showToast("Success", "Transport details uploaded successfully", "success");
        navigate(`/company/edit-train/${data.train._id}`);
      }
    } catch (error) {
      showToast("Error", error.response.data.message || error.response.data.error, "error");
    }
    setIsSubmitting(false);
  }


  const allowedRoles = ["Company", "Admin"]
  const isAuthorized = allowedRoles.includes(user?.roles[0])
  console.log(isAuthorized)

  if (!isAuthorized) {
    return <Navigate to={'/dashboard'} replace />
  }


  return (
    <SidebarWithHeader>
      <div className=" gap-y-2">
        <div className="div text-center ">
          <h2 className="text-5xl ">Upload Your Train </h2>
        </div>
        <form onSubmit={handleSubmit} place-content>
          <div className="grid grid-cols-2 gap-4 p-6 ">
            <Input
              name="nameOrNumber"
              value={transportDetails.nameOrNumber}
              onChange={handleChange}
              label="Train Name or Number"
              placeholder="Enter train name or number"
              required
            />

            <Input
              name="departureStation"
              value={transportDetails.departureStation}
              onChange={handleChange}
              label="Departure Station"
              placeholder="Enter departure station"
              required
            />

            <Input
              name="arrivalStation"
              value={transportDetails.arrivalStation}
              onChange={handleChange}
              label="Arrival Station"
              placeholder="Enter arrival station"
              required
            />

            <Select placeholder='Select option'
              name="ways"
              value={transportDetails.ways}
              onChange={handleChange}
              variant="outline"
              label="Ways"
              placeholder="Select ways"
              required
            >
              {/* <Option value="One Way">One Way</Option>
              <Option value="To and Fro">To and Fro</Option> */}
              <option value='One Way'>One Way</option>
              <option value="To and Fro">To and Fro</option>
            </Select>

            {/* 
            <Select
              name="types"
              value={transportDetails.types}
              onChange={handleChange}
              variant="outline"
              label="Type"
              placeholder="Select type"
              required
            >
              <Option value="One Way">1st Class</Option> 
              <Option value="To and Fro">Standerd</Option>
            </Select> */}

            <Input
              name="firstclassPrice"
              value={transportDetails.firstclassPrice}
              onChange={handleChange}
              label="1st Class Price"
              placeholder="Price"
              required
            />
            <Input
              name="StanderdPrice"
              value={transportDetails.StanderdPrice}
              onChange={handleChange}
              label="Standerd Price"
              placeholder="Price"
              required
            />

            <Input
              name="departureTime"
              value={transportDetails.departureTime}
              onChange={handleChange}
              label="Departure Time"
              type="time"
              required
            />

            <Input
              name="arrivalTime"
              value={transportDetails.arrivalTime}
              onChange={handleChange}
              label="Arrival Time"
              type="time"
              required
            />

            <Input
              name="duration"
              value={transportDetails.duration}
              onChange={handleChange}
              label="Duration"
              placeholder="Enter duration of the journey"
              required
            />

            {/* <Input
              name="ticketPrice"
              value={transportDetails.ticketPrice}
              onChange={handleChange}
              label="Ticket Price"
              type="number"
              placeholder="Enter ticket price"
              required
            /> */}

            <Input
              name="availableSeats"
              value={transportDetails.availableSeats}
              onChange={handleChange}
              label="Available Seats"
              type="number"
              placeholder="Enter number of available seats"
              required
            />

            <Input
              name="returnTimeFromArrivalStation"
              value={transportDetails.returnTimeFromArrivalStation}
              onChange={handleChange}
              label="Return Time From Arrival Station"
              type="time"
              required
            />

            <Input
              name="arrivalTimeDepartureStation"
              value={transportDetails.arrivalTimeDepartureStation}
              onChange={handleChange}
              label="Arrival Time Departure Station"
              type="time"
              required
            />
          </div>
          <div className="text-center">
            <Button type="submit" color="blue" ripple="light">
              Upload Transport Details
            </Button>
          </div>
        </form>
      </div>
    </SidebarWithHeader>
  );
};

export default TrainUpload;
