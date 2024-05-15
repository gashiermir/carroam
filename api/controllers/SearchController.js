/**
 * SearchController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  search: async function (req, res) {
    try {
      const { standort, abholdatum, rueckgabedatum } = req.query;

      // Erstellen eines Kriterienobjekts für die Suche
      let searchCriteria = { where: {} };

      if (standort) {
        searchCriteria.where.standort = { contains: standort };
      }

      if (abholdatum) {
        searchCriteria.where.verfügbarkeitVon = { '<=': new Date(abholdatum) };
      }

      if (rueckgabedatum) {
        searchCriteria.where.verfügbarkeitBis = { '>=': new Date(rueckgabedatum) };
      }

      // Finden von Angeboten, die den Suchkriterien entsprechen
      const angebote = await Angebot.find(searchCriteria).populate('vermieter').populate('modelle');

      return res.view('pages/search/results', { angebote });
    } catch (err) {
      return res.serverError(err);
    }
  }
};

