module.exports = async function (req, res, proceed) {
    const userId = req.session.userId;
    const userRole = req.session.userRole;
  
    if (userRole === 'admin') {
      return proceed();
    }
  
    const angebotId = req.params.id;
    const angebot = await Angebot.findOne({ id: angebotId });
  
    if (angebot && angebot.vermieter === userId) {
      return proceed();
    }
  
    return res.forbidden('You are not allowed to perform this action.');
  };
  