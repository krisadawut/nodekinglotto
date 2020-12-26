const models = require('../models/index');

exports.index = async (req, res, next)=> {
    const sql = 'select pd.ltid, lt.ltdesc, pd.lpdmin, pd.lpdmax, pd.lpdmaxpn, lp.lpmin, lp.lpmax, lp.lpmaxpn, lp.mpid, pd.lpdst from lotto_play_detail pd left join l_lottery_type lt on lt.ltid = pd.ltid and lt.ltstatus = "1" and lt.ltids = "LT000" left join m_lotto_play lp on lp.ltid = pd.ltid order by pd.ltid';
    const data = await models.sequelize.query(sql, {
      type: models.sequelize.QueryTypes.SELECT
    });
  
    res.status(200).json({
      data: data
    });
}

exports.mpidck = async (req, res, next)=> {

  const {mpid} = req.body;
  const sql = 'select *from m_lotto_play WHERE mpid = "'+mpid+'"';
  const data = await models.sequelize.query(sql, {
    type: models.sequelize.QueryTypes.SELECT
  });

  res.status(200).json({
    data: data
  });
}

exports.insert = async (req, res, next)=> {
  try {

    const {ltid, lpmin, lpmax, lpmaxpn, mpid} = req.body;

    if (ltid=="") {
      const error = new Error("ไม่มีข้อมูล id");
      error.statusCode = 400;
      throw error;
    }

    //INSERT 
    const play = await models.Mltplay.create({
        ltid : ltid,
        lpmin: lpmin,
        lpmax: lpmax,
        lpmaxpn: lpmaxpn,
        lpst: '1',
        mpid : mpid
    });

    res.status(201).json({
      message: 'เพิ่มข้อมูลเรียบร้อยแล้ว',
      data: {
        ltid : play.ltid,
        prtid : play.prtid
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

exports.update = async (req, res, next)=> {
  try {
    const {ltid, lpmin, lpmax, lpmaxpn, mpid} = req.body;

    const mb = await models.Mltplay.update({
        ltid : ltid,
        lpmin: lpmin,
        lpmax: lpmax,
        lpmaxpn: lpmaxpn
    }, {
      where: {
        ltid : ltid,
        mpid: mpid
      }
    });

    res.status(200).json({
      message: 'แก้ไขข้อมูลเรียบร้อยแล้ว'
    });
  } catch (error) { 
    return res.status(error.statusCode).json({
      error : {
        message : error.message
      }
    });
  }
}