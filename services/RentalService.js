const Customer = require('../dao/models/Customer');
const Movie = require('../dao/models/Movie');
const Rental = require('../dao/models/Rental');
const SMTPServer = require('./SMTPServer');
const smtp = new SMTPServer();

class RentalService {
  static async getAllRental() {
    const rentals = await Rental.find();
    return rentals;
  }

  static async getRental(id) {
    try {
      const rental = await Rental.findById(id);
      if (!rental) return 'Rental details with the given Id was not found';
      return rental;
    } catch (error) {
      console.error('Get rental by Id :', error.message);
      return 'Please provide the id in valid format';
    }
  }

  static async createRental(body) {
    try {
      const customer = await Customer.findById(body.customerId);
      if (!customer) return 'Invalid customer';

      const movie = await Movie.findById(body.movieId);
      if (!movie) return 'Invalid movie';
      if (movie.numberInStock === 0) return 'Movie not in stock';

      const rental = new Rental({
        customer: {
          _id: customer._id,
          name: customer.name,
          phone: customer.phone,
          isGold: customer.isGold,
        },
        movie: {
          _id: movie._id,
          name: movie.name,
          dailyRentalRate: movie.dailyRentalRate,
        },
      });
      const result = await rental.save();
      movie.numberInStock--;
      movie.save();

      smtp.sendEmailNotification({ data: result, email: customer?.email });

      return result;
    } catch (error) {
      console.error('Create Rental :', error.message);
      return 'Exception in creating rental';
    }
  }

  static async deleteRental(id) {
    try {
      const rental = await Rental.findByIdAndRemove(id);
      if (!rental) return 'Rental details with the given ID was not found';
      return rental;
    } catch (error) {
      console.error('Delete Rental :', error.message);
      return 'Exception in deleting rental';
    }
  }
}

module.exports = RentalService;
