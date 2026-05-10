const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    tripName: {
        type: String,
        required: true
    },

    destination: {
        type: String,
        required: true
    },

    startDate: {
        type: String
    },

    endDate: {
        type: String
    },

    budget: {
        type: Number,
        default: 0
    },

    description: {
        type: String
    },

    coverImage: {
        type: String
    },

    itinerary: [
    {
        day: String,
        date: String,
        activities: String
    }
    ],

    selectedCities: [
        {
            city: String,
            country: String,
            costIndex: String,
            popularity: String
        }
    ],

    transportCost: {
  type: Number,
  default: 0
},

stayCost: {
  type: Number,
  default: 0
},

foodCost: {
  type: Number,
  default: 0
},

activitiesCost: {
  type: Number,
  default: 0
},

tripDays: {
  type: Number,
  default: 1
},

packingChecklist: [
  {
    item: String,
    category: String,
    packed: {
      type: Boolean,
      default: false
    }
  }
],

}, { timestamps: true });

module.exports = mongoose.model("Trip", tripSchema);