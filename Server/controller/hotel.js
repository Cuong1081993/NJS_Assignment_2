const Hotel = require("../model/hotel");
const Room = require("../model/room");
const User = require("../model/user");
const Transaction = require("../model/transaction");
exports.getHotels = async (req, res, next) => {
  const hotels = await Hotel.find().populate("rooms");
  res.status(200).json({ message: "Fetch hotels", hotels: hotels });
};

exports.searchKey = async (req, res, next) => {
  const destination = req.query.destination;
  const hotel = await Hotel.find({ $text: { $search: destination } });
  console.log(hotel);
  res.status(200).json({ message: `Hotel in ${destination}`, hotels: hotel });
};

exports.byRating = async (req, res, next) => {
  const hotels = await Hotel.find().sort({ rating: -1 }).limit(5);
  res.status(200).json({ message: "Hotels by rating", hotels: hotels });
};

exports.getByHotelId = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const hotel = await Hotel.findById(hotelId);
  const rooms = await Room.find({ _id: { $in: hotel.rooms } });
  res.status(200).json({ message: "Fetch hotels", hotel: hotel, rooms: rooms });
};

exports.booking = async (req, res, next) => {
  const { user, hotel, room, dateStart, dateEnd, price, payment, status } =
    req.body;
  const existingUser = User.findById(user);
  if (!existingUser) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
  const transaction = new Transaction({
    user: user,
    hotel: hotel,
    room: room,
    dateStart: dateStart,
    dateEnd: dateEnd,
    price: price,
    payment: payment,
    status: status,
  });
  const results = await transaction.save();
  res.status(200).json({ message: "Booking Success", results: results });
};

exports.transaction = async (req, res, next) => {
  const { user } = req.body;
  const transactions = await Transaction.find({ user: user }).populate("hotel");
  res.status(200).json({ message: "Transaction", transactions: transactions });
};
