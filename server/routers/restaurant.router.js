import restaurantController from "../controllers/restaurant.controller.js";
import express from "express";

const router = express.Router();
// POST http://localhost:5000/api/v1/restaurant
router.post("/", restaurantController.create);

router.get("/", restaurantController.getAll);

router.get("/:id", restaurantController.getById);

router.put("/:id", restaurantController.update);

router.delete("/:id", restaurantController.deleted);

export default router;