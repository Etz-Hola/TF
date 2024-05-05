// controllers/transportController.js

const Transport = require("../models/trainTransportModel");
const userModel = require("../models/userModel");

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
      firstClassPrice,
      standardPrice,
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
      firstClassPrice,
      standardPrice,
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







const getTicketPrice = async (req, res) => {
  try {
    const { class: ticketClass, trainId } = req.params; 
    const train = await Transport.findById(trainId); // Fetch the train details by ID or any other identifier

    if (!train) {
      console.log('result not found')
      return res.status(404).json({ error: "Train not found" });
    }

    let price;
    // Determine the price based on the selected class
    if (ticketClass === 'standard') {
      price = train.standardPrice;
    } else if (ticketClass === 'firstClass') {
      price = train.firstClassPrice;
    } else {
      return res.status(400).json({ error: "Invalid ticket class" });
    }

    // Send the ticket price as a response
    res.json({ price });
  } catch (error) {
    console.error("Error getting ticket price:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}; 


// Controller function to create a booking with seat selection and calculate price
async function createBooking(req, res) {
  try {
    // Extracting parameters from request body
    const { trainId, userId, login, bookings } = req.body;

    // Validate required parameters
    if (!trainId || !userId || !login || !bookings || !Array.isArray(bookings) || bookings.length === 0) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    // Fetching the transport details
    const transport = await Transport.findById(trainId);

    if (!transport) {
      return res.status(404).json({ message: "Transport not found" });
    }

    const createdBookings = [];

    // Loop through each booking in the request
    for (const bookingData of bookings) {
      const { seats, seatType, passengerName, passengerEmail } = bookingData;

      // Validate required booking parameters
      if (!seats || !seatType || !passengerName || !passengerEmail) {
        return res.status(400).json({ message: "Invalid booking data" });
      }

      // Check if the requested seat type is valid
      if (seatType !== 'firstClass' && seatType !== 'standard') {
        return res.status(400).json({ message: "Invalid seat type" });
      }

      // Check if there are enough available seats
      if (seats > transport.availableSeats) {
        return res.status(400).json({ message: "Not enough available seats" });
      }

      // Calculate total price
      const seatTypePrice = seatType === 'firstClass' ? transport.firstClassPrice : transport.standardPrice;
      const totalPrice = seatTypePrice * seats;

      // Create the booking
      const newBooking = {
        user: userId,
        login: login,
        seats: seats,
        seatType: seatType,
        individualPrice: seatTypePrice,
        totalPrice: totalPrice,
        passengerName: passengerName,
        passengerEmail: passengerEmail,
        ticketNumber: generateTicketNumber(), // Function to generate a unique ticket number
        timestamp: Date.now()
      };

      // Push the booking to the bookings array
      transport.bookings[0].bookingsPerDay.push(newBooking);

      // Update the available seats
      transport.availableSeats -= seats;

      createdBookings.push(newBooking);
    }

    // Save the updated transport details
    await transport.save();

    // Provide detailed response about the created bookings
    return res.status(201).json({ message: "Bookings created successfully", bookings: createdBookings });

  } catch (error) {
    console.error("Error creating bookings:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


// Controller function to fetch booked tickets for a specific train on a specific date
const getBookingsByDate = async (req, res) => {
  try {
    const { trainId, date } = req.params;
    // Find all tickets booked for the given trainId and date
    const bookedTickets = await Ticket.find({ trainId, date });
    res.json({ bookings: bookedTickets }); // Send the booked tickets as a response
  } catch (error) {
    console.error('Error fetching booked tickets by date:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getBookedTickets = async (req, res) => {
  try {
    const { trainId } = req.params;
    // Find all tickets booked for the given trainId
    const bookedTickets = await Ticket.find({ trainId });
    res.json({ bookings: bookedTickets }); // Send the booked tickets as a response
  } catch (error) {
    console.error('Error fetching booked tickets:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const purchaseCourse = async (req, res) => {
	try {
		const userId = req.userId; // Assuming you have user information stored in req.user after authentication
		const courseId = req.params.courseId;

		// Find the course by its ID
		const course = await Course.findById(courseId);
		if (!course) {
			return res.status(404).json({ message: "Course not found" });
		}

		// Ensure the course is published
		if (!course.isPublished) {
			return res.status(403).json({ message: "Course is not published" });
		}

		// Check if the user is already enrolled in the course
		const user = await User.findById(userId);
		if (user.enrolledCourses.includes(courseId)) {
			return res
				.status(403)
				.json({ message: "User is already enrolled in this course" });
		}

		const line_items = [
			{
				price_data: {
					currency: "USD",
					product_data: {
						name: course.title,
					},
					unit_amount: Math.round(course.price * 100),
				},
				quantity: 1,
			},
		];

		let stripeCustomer = await StripeCustomer.findOne({ userId });
		if (!stripeCustomer) {
			const customer = await stripe.customers.create({
				email: user.email,
			});
			stripeCustomer = await StripeCustomer.create({
				userId,
				stripeCustomerId: customer.id,
			});
		}

		// Create checkout session
		const session = await stripe.checkout.sessions.create({
			customer: stripeCustomer.stripeCustomerId,
			line_items,
			mode: "payment",
			success_url: `http://localhost:5173/study/${courseId}?success=1`,
			cancel_url: `http://localhost:5173/courses/${courseId}/info?cancelled=1`,
			metadata: {
				courseId,
				userId,
			},
		});

		// console.log(session)

		// res.json({ url: session.url });
		res.json({ url: session.url });
	} catch (error) {
		console.error("[PURCHASE_COURSE]", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const handleStripeWebhook = async (req, res, next) => {
	try {
		// console.log(req)
		const { body, headers } = req;
		const signature = headers["stripe-signature"];
		//   console.log('body', body)
		//   console.log('headers', headers)
		//   console.log('signature', signature)

		let event;
		try {
			event = stripe.webhooks.constructEvent(
				body,
				signature,
				process.env.STRIPE_WEBHOOK_SECRET
			);
			// console.log(event)
		} catch (error) {
			// console.log('error', error)
			return res.status(400).send(`Webhook Error: ${error.message}`);
		}

		const session = event.data.object;
		const userId = session?.metadata?.userId;
		const courseId = session?.metadata?.courseId;
		//   console.log(session)
		//   console.log(userId)
		//   console.log(courseId)

		const course = await Course.findById(courseId);
		const courseClassroom = await Classroom.findOne({ course: courseId });
		const client = createStreamChatClient();

		const user = await userModel.findById(userId);

		if (event.type === "checkout.session.completed") {
			if (!userId || !courseId) {
				return res.status(400).send("Webhook Error: Missing metadata");
			}
			course.purchasedBy.push({ user: userId, amount: course.price });
			await course.save();

			courseClassroom.students.push(userId);
			await courseClassroom.save();

			// Add the course to the enrolledCourses array in the user model
			user.enrolledCourses.push(courseId);
			await user.save();

			const channel = client.channel("messaging", courseId);
			// console.log(channel)
			await channel.addMembers([
				{ user_id: userId, channel_role: "channel_member" },
			]);

			// await Purchase.create({ courseId, userId });
		} else {
			return res
				.status(200)
				.send(`Webhook Error: Unhandled event type ${event.type}`);
		}

		res.status(200).send();
	} catch (error) {
		console.error("[HANDLE_STRIPE_WEBHOOK]", error);
		res.status(500).send("Internal server error");
	}
};


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
  getTicketPrice,
  createBooking,
  getBookingsByDate,
  getBookedTickets,
  handleStripeWebhook

};
