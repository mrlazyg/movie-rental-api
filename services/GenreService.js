const { Genre } = require('../dao/models/Genre');

class GenreService {
  static async getAllGenre() {
    const genres = await Genre.find();
    return genres;
  }

  static async getGenre(id) {
    try {
      const genre = await Genre.findById(id);
      // if (!genre) return 'The genre with the given Id was not found.';
      return genre;
    } catch (error) {
      console.log('Get Genre by Id :', error.message);
      return 'The genre with the given Id was not found.';
    }
  }

  static async createGenre(body) {
    try {
      let genre = new Genre(body);
      genre = await genre.save();
      return genre;
    } catch (error) {
      console.log('Create Genre :', error.message);
      return 'Something wrong!';
    }
  }
}

module.exports = GenreService;
