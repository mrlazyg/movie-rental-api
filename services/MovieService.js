const Movie = require('../dao/models/Movie');
const { Genre } = require('../dao/models/Genre');

class MovieService {
  static async getAllMovie() {
    const movies = await Movie.find();
    return movies;
  }

  static async getMovie(id) {
    try {
      const movie = await Movie.findById(id);
      if (!movie) return 'The movie with the given Id was not found';
      return movie;
    } catch (error) {
      console.error('Get movie by Id :', error.message);
      return 'Please provide the id in valid format';
    }
  }

  static async createMovie(body) {
    try {
      const genre = await Genre.findById(body.genreId);
      body.genre = genre;
      delete body.genreId;
      let movie = new Movie(body);
      movie = await movie.save();
      return movie;
    } catch (error) {
      console.error('Create Movie :', error.message);
      return 'Exception in creating movie';
    }
  }

  static async updateMovie(id, body) {
    try {
      const movie = await Movie.findByIdAndUpdate(id, body, { new: true });
      if (!movie) return 'The movie with the given ID was not found';
      return movie;
    } catch (error) {
      console.error('Update Movie :', error.message);
      return 'Exception in updating movie';
    }
  }

  static async deleteMovie(id) {
    try {
      const movie = await Movie.findByIdAndRemove(id);
      if (!movie) return 'The movie with the given ID was not found';
      return movie;
    } catch (error) {
      console.error('Delete Movie :', error.message);
      return 'Exception in deleting movie';
    }
  }
}

module.exports = MovieService;
