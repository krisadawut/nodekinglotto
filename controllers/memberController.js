const models = require('../models/index');

exports.index = async (req, res, next)=> {
  const member = await models.Members.findAll();

  res.status(200).json({
    data: member
  });
}