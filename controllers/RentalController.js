const RentalService = require('../services/RentalService');

class RentalController {
  static async getAllRental(req, res) {
    const rentals = await RentalService.getAllRental();
    res.send(rentals);
  }

  static async getRental(req, res) {
    if (req.params.id) {
      const rental = await RentalService.getRental(req.params.id);
      return res.send(rental);
    }
    res.status(400).send('Please provide the rental Id');
  }

  static async createRental(req, res) {
    const { customerId, movieId } = req.body;
    if (customerId && movieId) {
      const rental = await RentalService.createRental(req.body);
      return res.send(rental);
    }
    res.status(400).send('Please provide required params');
  }

  static async deleteRental(req, res) {
    if (req.params.id) {
      const rental = await RentalService.deleteRental(req.params.id);
      return res.send(rental);
    }
    res.status(400).send('Please provide the rental id');
  }
}

module.exports = RentalController;
