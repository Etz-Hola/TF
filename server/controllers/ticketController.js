const Ticket = require('../models/Ticket');
const Train = require("../models/Train");

// Controller function to book tickets
const bookTicket = async (req, res) => {
  try {
    const { trainId, userId, seats, seatType } = req.body;

    // Find the train to get the price
    const train = await Train.findById(trainId);

    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }

    // Calculate total price based on seat type and number of seats
    let totalPrice;
    if (seatType === "firstClass") {
      totalPrice = train.firstClassPrice * seats;
    } else {
      totalPrice = train.standardPrice * seats;
    }

    // Generate a unique ticket ID (You can use a library like 'uuid' for this purpose)
    const ticketId = generateTicketId();

    // Create a new ticket
    const ticket = new Ticket({
      trainId,
      userId,
      seats,
      totalPrice,
      seatType,
      ticketId,
      departureStation: train.departureStation,
      arrivalStation: train.arrivalStation,
      departureTime: train.departureTime,
    });

    // Save the ticket to the database
    await ticket.save();

    res.status(201).json({ message: "Ticket booked successfully", ticket });
  } catch (error) {
    console.error("Error booking ticket:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to generate a unique ticket ID
const generateTicketId = () => {
  // You can use a library like 'uuid' to generate a unique ID
  // For simplicity, let's generate a simple ID using timestamp
  const timestamp = new Date().getTime();
  return `TICKET_${timestamp}`;
};

// Export the controller functions
module.exports = {
  bookTicket
};




// const StripeCustomer = require("../models/StripeCustomerModel");
// const stripe = require("stripe")(process.env.STRIPE_SECRET);

// const purchaseCourse = async (req, res) => {
// 	try {
// 		const userId = req.userId; // Assuming you have user information stored in req.user after authentication
// 		const courseId = req.params.courseId;

// 		// Find the course by its ID
// 		const course = await Course.findById(courseId);
// 		if (!course) {
// 			return res.status(404).json({ message: "Course not found" });
// 		}

// 		// Ensure the course is published
// 		if (!course.isPublished) {
// 			return res.status(403).json({ message: "Course is not published" });
// 		}

// 		// Check if the user is already enrolled in the course
// 		const user = await User.findById(userId);
// 		if (user.enrolledCourses.includes(courseId)) {
// 			return res
// 				.status(403)
// 				.json({ message: "User is already enrolled in this course" });
// 		}

// 		const line_items = [
// 			{
// 				price_data: {
// 					currency: "USD",
// 					product_data: {
// 						name: course.title,
// 					},
// 					unit_amount: Math.round(course.price * 100),
// 				},
// 				quantity: 1,
// 			},
// 		];

// 		let stripeCustomer = await StripeCustomer.findOne({ userId });
// 		if (!stripeCustomer) {
// 			const customer = await stripe.customers.create({
// 				email: user.email,
// 			});
// 			stripeCustomer = await StripeCustomer.create({
// 				userId,
// 				stripeCustomerId: customer.id,
// 			});
// 		}

// 		// Create checkout session
// 		const session = await stripe.checkout.sessions.create({
// 			customer: stripeCustomer.stripeCustomerId,
// 			line_items,
// 			mode: "payment",
// 			success_url: `http://localhost:5173/study/${courseId}?success=1`,
// 			cancel_url: `http://localhost:5173/courses/${courseId}/info?cancelled=1`,
// 			metadata: {
// 				courseId,
// 				userId,
// 			},
// 		});

// 		// console.log(session)

// 		// res.json({ url: session.url });
// 		res.json({ url: session.url });
// 	} catch (error) {
// 		console.error("[PURCHASE_COURSE]", error);
// 		res.status(500).json({ message: "Internal server error" });
// 	}
// };

// const handleStripeWebhook = async (req, res, next) => {
// 	try {
// 		// console.log(req)
// 		const { body, headers } = req;
// 		const signature = headers["stripe-signature"];
// 		//   console.log('body', body)
// 		//   console.log('headers', headers)
// 		//   console.log('signature', signature)

// 		let event;
// 		try {
// 			event = stripe.webhooks.constructEvent(
// 				body,
// 				signature,
// 				process.env.STRIPE_WEBHOOK_SECRET
// 			);
// 			// console.log(event)
// 		} catch (error) {
// 			// console.log('error', error)
// 			return res.status(400).send(`Webhook Error: ${error.message}`);
// 		}

// 		const session = event.data.object;
// 		const userId = session?.metadata?.userId;
// 		const courseId = session?.metadata?.courseId;
// 		//   console.log(session)
// 		//   console.log(userId)
// 		//   console.log(courseId)

// 		const course = await Course.findById(courseId);
// 		const courseClassroom = await Classroom.findOne({ course: courseId });
// 		const client = createStreamChatClient();

// 		const user = await User.findById(userId);

// 		if (event.type === "checkout.session.completed") {
// 			if (!userId || !courseId) {
// 				return res.status(400).send("Webhook Error: Missing metadata");
// 			}
// 			course.purchasedBy.push({ user: userId, amount: course.price });
// 			await course.save();

// 			courseClassroom.students.push(userId);
// 			await courseClassroom.save();

// 			// Add the course to the enrolledCourses array in the user model
// 			user.enrolledCourses.push(courseId);
// 			await user.save();

// 			const channel = client.channel("messaging", courseId);
// 			// console.log(channel)
// 			await channel.addMembers([
// 				{ user_id: userId, channel_role: "channel_member" },
// 			]);

// 			// await Purchase.create({ courseId, userId });
// 		} else {
// 			return res
// 				.status(200)
// 				.send(`Webhook Error: Unhandled event type ${event.type}`);
// 		}

// 		res.status(200).send();
// 	} catch (error) {
// 		console.error("[HANDLE_STRIPE_WEBHOOK]", error);
// 		res.status(500).send("Internal server error");
// 	}
// };
