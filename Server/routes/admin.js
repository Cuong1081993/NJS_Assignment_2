const express = require("express");

const router = express.Router();

const adminController = require("../controller/admin");

router.get("/hotels", adminController.getHotels);

router.get("/hotels/:hotelId", adminController.getHotelById);

router.post("/addHotel", adminController.addHotel);

router.patch("/editHotel/:hotelId", adminController.editHotel);

router.delete("/deleteHotel/:hotelId", adminController.deleteHotel);

router.get("/rooms", adminController.getRooms);

router.get("/rooms/:roomId", adminController.getRoomById);

router.post("/addRoom", adminController.addRoom);

router.patch("/editRoom/:roomId", adminController.editRoom);

router.delete("/deleteRoom/:roomId", adminController.deleteRoom);

router.get("/users", adminController.getUser);

router.get("/transactions", adminController.transaction);

module.exports = router;
