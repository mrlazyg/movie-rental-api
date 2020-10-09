const { Genre } = require('../dao/models/Genre');

class GenreService {
  static async getAllGenre() {
    const genres = await Genre.find();
    return genres;
  }

  static async getGenre(id) {
    try {
      const genre = await Genre.findById(id);

      if (!genre) return 'The genre with the given Id was not found.';
      return genre;
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = GenreService;
