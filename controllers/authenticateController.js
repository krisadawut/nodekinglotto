const models = require('../models/index');

exports.index = async (req, res, next)=> {
//   const member = await models.Members.findAll();
const sql = 'select *from m_member where musername = "'+req.param('username')+'" and mpsswd="' +req.param('password')+'"';
  const member = await models.sequelize.query(sql, {
    type: models.sequelize.QueryTypes.SELECT
   
  });
  
  res.status(200).json({
    data: member
  });
}