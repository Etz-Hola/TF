const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema(

  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      
    },
		email: {
			type: String,
			required: [true, 'Please add an email'],
			unique: true,
		},
    phoneNumber: {
      type: String,
      trim: true,
      unique: true,
    },
    
		googleId: String,
		
    password: {
      type: String,
      // required: [true, 'Please add a password'],
    },
    roles: {
			User: {
				type: String,
				default: "User",
			},
		},

    isCompany: {
      type: Boolean,
      default: false
    }
  

  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
