import Restaurant from "../models/restaurant.model.js";

const restaurantController = {};
//Create and Save a new restaurant
restaurantController.create = async (req, res) => {
    const { title, type, img } = req.body;
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

restaurantController.getAll = async (req, res) => {
  await Restaurant.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error while \"geting all\" the restaurant",
      });
    });
}

restaurantController.getById = async (req, res) => {
  const id = req.params.id;
  await Restaurant.findByPk(id)
    .then((data) => {
      if(!data) {
        res.status(404).send({message: `Restaurant not found by id: ${id}`});
        return;
      }
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || `Something error while "geting by id: ${id}" the restaurant`,
      });
    });
};


restaurantController.update = async (req, res) => {
  const id = req.params.id;
  const { title, type, img } = req.body;
  console.log("body:", req.body);
  if (!title && !type && !img) {
    res
      .status(400)
      .send({ message: "Name, Type, or Img can not be empty!" });
    return;
  }

  const newRestaurant = {
    title: title,
    type: type,
    img: img,
  };

  console.log("new:", newRestaurant);

  await Restaurant.update(
    { title, type, img },
    { where: { id: id } }
  ).then((num) => {
    if(num == 1) {
      res.send({ message: "Updated success!" });
    }else {
      res.status(404).send({ message: `Cannot update restaurant with id: ${id}. Maybe restaurant not found.` })
    }
  }).catch((err) => {
    res.status(500).send({
      message:
        err.message ||
        `Something error while "Updated by id: ${id}" the restaurant`,
    });
  });
};

restaurantController.deleted = async (req, res) => {
  const id = req.params.id;
  await Restaurant.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Deleted success!" });
      } else {
        res
          .status(404)
          .send({
            message: `Cannot Deleted restaurant with id: ${id}. Maybe restaurant not found.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Something error while "Deleted by id: ${id}" the restaurant`,
      });
    });
}

export default restaurantController;