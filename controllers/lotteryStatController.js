const models = require('../models/index');

exports.index = async (req, res, next)=> {
  const sql = 'select s.lsid, s.lsdesc, s.ltid, t.ltdesc, s.prid, s.lsstatus, p.prdesc from l_lottery_stat s left join l_lottery_type t on s.ltid = t.ltid left join l_period p on p.prid = s.prid WHERE s.LSSTATUS = "1"';
  const lotterystat = await models.sequelize.query(sql, {
    type: models.sequelize.QueryTypes.SELECT
  });

  res.status(200).json({
    data: lotterystat
  });
}

exports.getmaxid = async (req, res, next)=> {
  const sql = 'SELECT TRIM(CONCAT("LS", LPAD(CONVERT(SUBSTRING(MAX(lsid),3),UNSIGNED INTEGER)+1,8,0))) maxid from l_lottery_stat';
  const membertype = await models.sequelize.query(sql, {
    type: models.sequelize.QueryTypes.SELECT
  });

  res.status(200).json({
    data: membertype
  });
}

exports.getperiod = async (req, res, next)=> {
  const sql = 'SELECT prid AS value, prdesc as viewValue from l_period WHERE prstatus = "1"';
  const period = await models.sequelize.query(sql, {
    type: models.sequelize.QueryTypes.SELECT
  });

  res.status(200).json({
    data: period
  });
}

exports.getlotterytype = async (req, res, next)=> {
  const sql = 'SELECT ltid AS value, ltdesc AS viewValue from l_lottery_type WHERE ltids = "LT000" AND ltstatus = "1" ORDER BY ltid';
  const lotterytype = await models.sequelize.query(sql, {
    type: models.sequelize.QueryTypes.SELECT
  });

  res.status(200).json({
    data: lotterytype
  });
}

exports.insert = async (req, res, next)=> {
  try {
    const {lsid, lsdesc, ltid, prid, lsstatus} = req.body;
    // let lsid = req.param('lsid');
    // let lsdesc = req.param('lsdesc');
    // let ltid = req.param('ltid');
    // let prid = req.param('prid');
    // let lsstatus = '1';
    // if (lsid=="") {
    //   const error = new Error("ไม่มีข้อมูล id");
    //   error.statusCode = 400;
    //   throw error;
    // }

    //insert
    const lottoStat = await models.LottoStat.create({
      lsid : lsid,
      lsdesc: lsdesc,
      ltid: ltid,
      prid: prid,
      lsstatus: '1'
    });

    res.status(201).json({
      message: 'เพิ่มข้อมูลเรียบร้อยแล้ว',
      data: {
        lsid : lottoStat.lsid,
        lsdesc : lottoStat.lsdesc,
        ltid : lottoStat.ltid,
        prid: lottoStat.prid,
        lsstatus: lottoStat.lsstatus
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
    let lsid = req.param('lsid');
    let lsdesc = req.param('lsdesc');
    let ltid = req.param('ltid');
    let prid = req.param('prid');
    // const {lsid, lsdesc, ltid, prid} = req.body;
    const mb = await models.LottoStat.update({
      lsdesc : lsdesc,
    }, {
      where: {
        lsid: lsid,
        ltid: ltid,
        prid: prid
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

exports.destroy = async (req, res, next)=> {
  
  try {
    // const {lsid, lsdesc, ltid, prid, lsstatus} = req.body;
    let lsid = req.param('lsid');
    let lsstatus = req.param('lsstatus');
    console.log('lsid ' + lsid);
    console.log('lsstatus ' + lsstatus);

    const upd = await models.LottoStat.update({
      lsstatus : lsstatus
    }, {
      where: {
        lsid:lsid
      }

    });

    res.status(200).json({
      message: 'ลบข้อมูลเรียบร้อยแล้ว'
    });
  } catch (error) { 
    return res.status(error.statusCode).json({
      error : {
        message : error.message
      }
    });
  }
}