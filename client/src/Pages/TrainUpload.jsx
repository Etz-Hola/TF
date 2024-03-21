import React, { useState } from 'react';
import SidebarWithHeader from '../SidebarWithHeader';
import {
    Input,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";

const TrainUpload = () => {
    const [transportDetails, setTransportDetails] = useState({
        nameOrNumber: '',
        departureStation: '',
        ways: '',
        types: '',
        arrivalStation: '',
        departureTime: '',
        arrivalTime: '',
        duration: '',
        ticketPrice: '',
        availableSeats: '',
        returnTimeFromArrivalStation: '',
        arrivalTimeDepartureStation: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransportDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/upload-transport-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transportDetails)
            });
            if (response.ok) {
                alert('Transport details uploaded successfully');
            } else {
                alert('Failed to upload transport details');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Internal server error');
        }
    };

    return (
        <SidebarWithHeader>
            <div className=" gap-y-2">

                <Card className=" flex max-w-200 flex-row">
                    <CardHeader floated={false} className="h-80">
                        <img src="https://docs.material-tailwind.com/img/team-4.jpg" alt="profile-picture" />
                    </CardHeader>

                    <CardBody className="text-center ">
                        <Typography variant="h4" color="blue-gray" className="mb-2">
                            Natalie Paisley
                        </Typography>
                        <Typography color="blue-gray" className="font-medium" textGradient>
                            CEO / Co-Founder
                        </Typography>
                    </CardBody>
                    <CardFooter className="flex justify-center gap-7 pt-2">
                        <Tooltip content="Like">
                            <Typography
                                as="a"
                                href="#facebook"
                                variant="lead"
                                color="blue"
                                textGradient
                            >
                                <i className="fab fa-facebook" />
                            </Typography>
                        </Tooltip>
                        <Tooltip content="Follow">
                            <Typography
                                as="a"
                                href="#twitter"
                                variant="lead"
                                color="light-blue"
                                textGradient
                            >
                                <i className="fab fa-twitter" />
                            </Typography>
                        </Tooltip>
                        <Tooltip content="Follow">
                            <Typography
                                as="a"
                                href="#instagram"
                                variant="lead"
                                color="purple"
                                textGradient
                            >
                                <i className="fab fa-instagram" />
                            </Typography>
                        </Tooltip>
                    </CardFooter>
                </Card>














                <div className="div text-center ">
                    <h2 className='text-5xl '>Upload Your Train </h2>
                </div>
                <form onSubmit={handleSubmit} place-content>
                    <div className="grid grid-cols-2 gap-4 p-6 ">
                        <Input name="nameOrNumber" value={transportDetails.nameOrNumber} onChange={handleChange} label="Train Name or Number" placeholder="Enter train name or number" />
                        <Input name="departureStation" value={transportDetails.departureStation} onChange={handleChange} label="Departure Station" placeholder="Enter departure station" />
                        <Input name="ways" value={transportDetails.ways} onChange={handleChange} label="Ways" placeholder="Enter ways" />
                        <Input name="types" value={transportDetails.types} onChange={handleChange} label="Types" placeholder="Enter types" />
                        <Input name="arrivalStation" value={transportDetails.arrivalStation} onChange={handleChange} label="Arrival Station" placeholder="Enter arrival station" />
                        <Input name="departureTime" value={transportDetails.departureTime} onChange={handleChange} label="Departure Time" type="time" />
                        <Input name="arrivalTime" value={transportDetails.arrivalTime} onChange={handleChange} label="Arrival Time" type="time" />
                        <Input name="duration" value={transportDetails.duration} onChange={handleChange} label="Duration" placeholder="Enter duration of the journey" />
                        <Input name="ticketPrice" value={transportDetails.ticketPrice} onChange={handleChange} label="Ticket Price" type="number" placeholder="Enter ticket price" />
                        <Input name="availableSeats" value={transportDetails.availableSeats} onChange={handleChange} label="Available Seats" type="number" placeholder="Enter number of available seats" />
                        <Input name="returnTimeFromArrivalStation" value={transportDetails.returnTimeFromArrivalStation} onChange={handleChange} label="Return Time From Arrival Station" type="time" />
                        <Input name="arrivalTimeDepartureStation" value={transportDetails.arrivalTimeDepartureStation} onChange={handleChange} label="Arrival Time Departure Station" type="time" />
                    </div>
                    <div className='text-center'>
                        <Button type="submit" color="blue" ripple="light">Upload Transport Details</Button>

                    </div>
                </form>



            </div>



        </SidebarWithHeader>
    );
}

export default TrainUpload;
