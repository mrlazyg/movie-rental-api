const { Genre } = require('../dao/models/Genre');

class GenreService {
  static async getAllGenre() {
    const genres = await Genre.find();
    return genres;
  }

  static async getGenre(id) {
    try {
      const genre = await Genre.findById(id);
      if (!genre) return 'The genre with the given Id was not found';
      return genre;
    } catch (error) {
      console.error('Get Genre by Id :', error.message);
      return 'Please provide the id in valid format';
    }
  }

  static async createGenre(body) {
    try {
      let genre = new Genre(body);
      genre = await genre.save();
      return genre;
    } catch (error) {
      console.error('Create Genre :', error.message);
      return 'Something wrong!';
    }
  }
}

module.exports = GenreService;
