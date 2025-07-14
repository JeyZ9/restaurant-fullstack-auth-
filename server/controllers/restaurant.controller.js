import Restaurant from "../models/restaurant.model.js";

const restaurantController = {};
//Create and Save a new restaurant
restaurantController.create = async (req, res) => {
    const { title, type, img } = req.body;
    console.log("Incoming body:", req.body);

  // validate data
  if (!title || !type || !img) {
    res.status(400).send({ message: "Name, Type, or Img can not be empty!" });
    return;
  }

  await Restaurant.findOne({ where: { title:title } }).then((restaurant) => {
    if (restaurant) {
      res.status(400).send({ message: "Restaurant already exists!" });
      return;
    }
    const newRestaurant = {
      title:title,
      type:type,
      img:img,
    };

    Restaurant.create(newRestaurant)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message || "Something error while creating the restaurant",
        });
      });
  });
};

export default restaurantController;