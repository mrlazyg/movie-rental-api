const MovieService = require('../services/MovieService');

class MovieController {
  static async getAllMovie(req, res) {
    const movies = await MovieService.getAllMovie();
    res.send(movies);
  }

  static async getMovie(req, res) {
    if (req.params.id) {
      const movie = await MovieService.getMovie(req.params.id);
      return res.send(movie);
    }
    res.status(400).send('Please provide the movie Id');
  }

  static async createMovie(req, res) {
    const { name, genreId, numberInStock, dailyRentalRate } = req.body;
    if (name && genreId && numberInStock && dailyRentalRate) {
      const movie = await MovieService.createMovie(req.body);
      return res.send(movie);
    }
    res.status(400).send('Please provide required params');
  }

  static async updateMovie(req, res) {
    if (req.params.id && req.body) {
      const movie = await MovieService.updateMovie(req.params.id, req.body);
      return res.send(movie);
    }
    res.status(400).send('Please provide the required params');
  }

  static async deleteMovie(req, res) {
    if (req.params.id) {
      const movie = await MovieService.deleteMovie(req.params.id);
      return res.send(movie);
    }
    res.status(400).send('Please provide the movie id');
  }
}

module.exports = MovieController;
