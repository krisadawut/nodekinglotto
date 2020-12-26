const models = require('../models/index');

exports.index = async (req, res, next)=> {
  const data = await models.Mltplay.findAll({
  });

  res.status(200).json({
    data: data
  });
}

exports.getmaxid = async (req, res, next)=> {
  const sql = 'SELECT TRIM(CONCAT("LP", LPAD(CONVERT(SUBSTRING(MAX(lpid),3),UNSIGNED INTEGER)+1,8,0))) maxid from m_lotto_play';
  const data = await models.sequelize.query(sql, {
    type: models.sequelize.QueryTypes.SELECT
  });

  res.status(200).json({
    data: data
  });
}

exports.lotteryplay = async (req, res, next)=> {
  const sql = 'select a.ltid, a.ltdesc, b.lpid, b.lpminimum_st, b.lpminimum_df, b.lpmaximum_st, b.lpmaximum_df, b.lpmaximum_pnst, b.lpmaximum_pndf, b.lpstatus from l_lottery_type a left join m_lotto_play b on a.ltid = b.ltid where ltids = "LT000"';
  const data = await models.sequelize.query(sql, {
    type: models.sequelize.QueryTypes.SELECT
  });

  res.status(200).json({
    data: data
  });
}

exports.insert = async (req, res, next)=> {
  try {

    // const {nid, ntitle, ndesc, nstatus} = req.body;
    let nid = req.param('nid');
    let ntitle = req.param('ntitle');
    let ndesc = req.param('ndesc');
    let nstatus = '1';

    if (nid=="") {
      const error = new Error("ไม่มีข้อมูล id");
      error.statusCode = 400;
      throw error;
    }

    //insert user  INSERT 
    const data = await models.Mltplay.create({
      nid : nid,
      ntitle: ntitle,
      ndesc: ndesc,
      nstatus:nstatus
    });

    res.status(201).json({
      message: 'เพิ่มข้อมูลเรียบร้อยแล้ว',
      data: {
        nid : data.nid,
        ntitle : data.ntitle
      }
    });

  } catch (error) {
    return res.status(error.statusCode).json({
      error : {
        message : error.message
      }
    });
  }
}
