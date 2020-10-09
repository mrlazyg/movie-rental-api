const GenreService = require('../services/GenreService');

class GenreController {
  static async getAllGenre(req, res) {
    const genres = await GenreService.getAllGenre();
    res.status(200).send(genres);
  }

  static async getGenre(req, res) {
    const { id } = req.params;

    if (id) {
      const genre = await GenreService.getGenre(id);
      return res.send(genre);
    }
    res.status(404).send('Please provide the genre Id');
  }
}

module.exports = GenreController;
