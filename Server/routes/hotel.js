const express = require("express");
const router = express.Router();

const hotellController = require("../controller/hotel");

router.get("/hotels", hotellController.getHotels);
router.get("/search", hotellController.searchKey);
router.get("/byrating", hotellController.byRating);
router.get("/:hotelId", hotellController.getByHotelId);
router.post("/:hotelId/booking", hotellController.booking);
router.post("/transaction", hotellController.transaction);

module.exports = router;
