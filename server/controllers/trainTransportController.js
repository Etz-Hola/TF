// controllers/transportController.js

const Transport = require("../models/trainTransportModel");

const uploadTrainDetails = async (req, res) => {
  try {
    console.log(req.body);
    // Extract transport details from the request body
    const {
      nameOrNumber,
      departureStation,
      ways,
      types,
      arrivalStation,
      departureTime,
      arrivalTime,
      duration,
      firstclassPrice,
      StanderdPrice,
      availableSeats,
      returnTimeFromArrivalStation,
      arrivalTimeDepartureStation,
    } = req.body;

    // company ID is available in the request
    const {companyId} = req.query; // You need to adjust this according to how company ID is passed in your request


    // Save the transport details to the database along with the company ID
    const newTransport = new Transport({
      nameOrNumber,
      departureStation,
      ways,
      types,
      arrivalStation,
      departureTime,
      arrivalTime,
      duration,
      firstclassPrice,
      StanderdPrice,
      availableSeats,
      returnTimeFromArrivalStation,
      arrivalTimeDepartureStation,
      company: companyId, // Associate the train with the company's ID
    });

    await newTransport.save();

    res
      .status(201)
      .json({ message: "Transport details uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//Update train
const updateTrainDetails = async (req, res) => {
  console.log(id)
  try {
    const { id } = req.params; // Extract the train ID from the request parameters
    const updatedTrain = await Transport.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedTrain) {
      return res.status(404).json({ error: "Train not found" });
    }

    res.status(200).json(updatedTrain);
  } catch (error) {
    console.error("Error updating train details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};





// to fetched train details
const getUploadedTrainDetailsById = async (req, res) => {
  try {
    const trainId = req.params.id; // Extract the train ID from the request parameters
    const train = await Transport.findById(trainId); // Fetch the train detail by ID

    if (!train) {
      return res.status(404).json({ error: "Train not found" });
    }

    // Send the fetched train detail as a response
    res.json(train);
  } catch (error) {
    console.error("Error getting train detail:", error);
    res.status(500).json({ message: "The Internal server error" });
  }
};

// Controller to fetch all train details
const getAllTrainDetails = async (req, res) => {
  try {
    console.log(req);
    const allTrains = await Transport.find(); // Fetch all train details from the database

    // Send the fetched train details as a response
    res.json(allTrains);
  } catch (error) {
    console.error("Error getting all train details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to fetch all trains uploaded by a specific company
const getUploadedTrainsByCompanyId = async (req, res) => {
  try {
    const companyId = req.params.companyId; // Extract the company ID from the request parameters
    const trains = await Transport.find({ company: companyId }); // Fetch trains by company ID

    // Send the fetched trains as a response
    res.json(trains);
  } catch (error) {
    console.error("Error getting trains by company ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




const getTrainsByStations = async (req, res) => {
  const { departureStation, arrivalStation } = req.query;
  try {
    let query = {};

    // Check if departureStation is provided
    if (departureStation) {
      query.departureStation = departureStation;
    }

    // Check if arrivalStation is provided
    if (arrivalStation) {
      query.arrivalStation = arrivalStation;
    }

    // Fetch trains based on the constructed query
    const trains = await Transport.find(query);
    
    // If both departure and arrival stations are provided but not matched, 
    // fetch trains with either of the stations
    if (departureStation && arrivalStation && trains.length === 0) {
      const alternateTrains = await Transport.find({
        $or: [{ departureStation }, { arrivalStation }],
      });
      res.json(alternateTrains);
    } else {
      // Send the fetched trains as a response
      res.json(trains);
    }
  } catch (error) {
    console.error('Error fetching trains by stations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};







// Controller function to extract departure and arrival stations
const searchTrainsByStations = async (req, res) => {
  try {
    // Fetch transport data from the database
    const transports = await Transport.find({});

    // Extract departure and arrival stations from the transport data
    const departureStations = transports.map(transport => transport.departureStation);
    const arrivalStations = transports.map(transport => transport.arrivalStation);

    // Remove duplicate stations
    const uniqueDepartureStations = Array.from(new Set(departureStations));
    const uniqueArrivalStations = Array.from(new Set(arrivalStations));

    // Return the extracted stations as a response
    res.json({
      departureStations: uniqueDepartureStations,
      arrivalStations: uniqueArrivalStations
    });
  } catch (error) {
    console.error('Error extracting stations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getOutboundTrains = async (req, res) => {
  const { departureStation, arrivalStation, selectedDate } = req.query;
  try {
    // Construct query to fetch outbound trains
    const query = {
      departureStation: departureStation,
      arrivalStation: arrivalStation,
      selectedDate: selectedDate
    };

    // Fetch outbound trains based on the constructed query
    const outboundTrains = await Transport.find(query);
    
    // Send the fetched outbound trains as a response
    res.json(outboundTrains);
  } catch (error) {
    console.error('Error fetching outbound trains:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getReturnTrains = async (req, res) => {
  const { departureStation, arrivalStation, selectedDate } = req.query;
  try {
    // Construct query to fetch return trains
    const query = {
      departureStation: arrivalStation, // Swap departure and arrival stations
      arrivalStation: departureStation,
      selectedDate: selectedDate
    };

    // Fetch return trains based on the constructed query
    const returnTrains = await Transport.find(query);
    
    // Send the fetched return trains as a response
    res.json(returnTrains);
  } catch (error) {
    console.error('Error fetching return trains:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




// const getTicketPrice = async (req, res) => {
//   try {
//     const { class } = req.params; // Extract the ticket class from the request parameters
//     const train = await Transport.findById(req.params.trainId); // Fetch the train details by ID or any other identifier
    
//     if (!train) {
//       return res.status(404).json({ error: "Train not found" });
//     }

//     let price;
//     // Determine the price based on the selected class
//     if (class === 'standard') {
//       price = train.standardPrice;
//     } else if (class === 'firstClass') {
//       price = train.firstClassPrice;
//     } else {
//       return res.status(400).json({ error: "Invalid ticket class" });
//     }

//     // Send the ticket price as a response
//     res.json({ price });
//   } catch (error) {
//     console.error("Error getting ticket price:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };










module.exports = {
  uploadTrainDetails,
  updateTrainDetails,
  getUploadedTrainDetailsById,
  getAllTrainDetails, 
  getUploadedTrainsByCompanyId,
  getTrainsByStations,
  searchTrainsByStations,
  getOutboundTrains,
  getReturnTrains,
  // getTicketPrice,

};
