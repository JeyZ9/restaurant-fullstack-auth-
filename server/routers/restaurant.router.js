import restaurantController from "../controllers/restaurant.controller.js";
import express from "express";
import authMiddleware from "../middleware/authJwt.js";

const { verifyToken, isAdmin } = authMiddleware;

const router = express.Router();
// POST http://localhost:5000/api/v1/restaurant
router.post("/", verifyToken, restaurantController.create);

router.get("/", restaurantController.getAll);

router.get("/:id", verifyToken, isAdmin, restaurantController.getById);

router.put("/:id", verifyToken, restaurantController.update);

router.delete("/:id", verifyToken, restaurantController.deleted);

export default router;