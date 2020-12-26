const models = require('../models/index');

exports.index = async (req, res, next)=> {
  // const lotterytype = await models.LotteryType.findAll({
  // });
  const sql = 'SELECT a.ltid, a.ltids, b.ltdesc maindesc, a.ltdesc, a.ltstatus  FROM l_lottery_type a LEFT JOIN (SELECT *FROM l_lottery_type c WHERE c.LTIDS IS null ) b ON b.LTID = a.LTIDS WHERE a.ltstatus = "1" AND a.ltids <> "LT000" ORDER by a.LTIDS, a.LTID';
  const lotterytype = await models.sequelize.query(sql, {
    type: models.sequelize.QueryTypes.SELECT
  });

  res.status(200).json({
    data: lotterytype
  });
}

exports.getmaxid = async (req, res, next)=> {
  const sql = 'SELECT TRIM(CONCAT("LT", LPAD(CONVERT(SUBSTRING(MAX(ltid),3),UNSIGNED INTEGER)+1,3,0))) maxid from l_lottery_type';
  const membertype = await models.sequelize.query(sql, {
    type: models.sequelize.QueryTypes.SELECT
  });

  res.status(200).json({
    data: membertype
  });
}

exports.getlotterytype = async (req, res, next)=> {
  const sql = 'SELECT ltid AS value, ltdesc AS viewValue from l_lottery_type WHERE ltids IS NULL AND ltid <> "LT000" ORDER BY ltid';
  const lotterytype = await models.sequelize.query(sql, {
    type: models.sequelize.QueryTypes.SELECT
  });

  res.status(200).json({
    data: lotterytype
  });
}

exports.insert = async (req, res, next)=> {
  try {
    // const {ltid, ltids, ltdesc, ltstatus} = req.body;
    let ltid = req.param('ltid');
    let ltids = req.param('ltids');
    let ltdesc = req.param('ltdesc');
    let ltstatus = '1';
    // if (ltid=="") {
    //   const error = new Error("ไม่มีข้อมูล id");
    //   error.statusCode = 400;
    //   throw error;
    // }

    //insert
    const lotteryType = await models.LotteryType.create({
      ltid : ltid,
      ltids: ltids,
      ltdesc: ltdesc,
      ltstatus: ltstatus
    });

    res.status(201).json({
      message: 'เพิ่มข้อมูลเรียบร้อยแล้ว',
      data: {
        ltid : lotteryType.ltid,
        ltids : lotteryType.ltids,
        ltdesc : lotteryType.ltdesc
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
    let ltid = req.param('ltid');
    let ltids = req.param('ltids');
    let ltdesc = req.param('ltdesc');
    // const {mtid, mtname, mtstatus} = req.body;
    console.log('ltid ' + ltid+ ' ' +ltids, + ' ' +ltdesc);

    const mb = await models.LotteryType.update({
      ltdesc : ltdesc,
    }, {
      where: {
        ltid:ltid,
        ltids: ltids
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
    let ltid = req.param('ltid');
    let ltstatus = req.param('ltstatus');
    console.log('ltid ' + ltid);

    const upd = await models.LotteryType.update({
      ltstatus : ltstatus
    }, {
      where: {
        ltid:ltid
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