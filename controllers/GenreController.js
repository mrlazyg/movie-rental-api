const GenreService = require('../services/GenreService');

class GenreController {
  static async getAllGenre(req, res) {
    const genres = await GenreService.getAllGenre();
    res.status(200).send(genres);
  }

  static async getGenre(req, res) {
    // console.log(req.headers);
    const { id } = req.params;

    if (id) {
      const genre = await GenreService.getGenre(id);
      return res.send(genre);
    }
    res.status(404).send('Please provide the genre Id');
  }

  static async createGenre(req, res) {
    const { body } = req;
    if (body.name) {
      const genre = await GenreService.createGenre(body);
      return res.send(genre);
    }
    res.send('Please provide genre name');
  }
}

module.exports = GenreController;
