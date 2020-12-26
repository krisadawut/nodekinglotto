const models = require('../models/index');

exports.index = async (req, res, next)=> {
    const sql = 'select prd.prtid, prt.prtdesc, prd.ltid, lt.ltdesc, prd.prdtop3, prd.prdbot3, prd.prdtod3, prd.prdtop2, prd.prdbot2, prd.prdtod2, prd.prdrtop, prd.prdrbot, pr.rptop3, pr.rpbot3, pr.rptod3, pr.rptop2, pr.rpbot2, pr.rptod2, pr.rprtop, pr.rprbot from m_pay_rate_detail prd left join l_pay_rate_type prt on prt.prtid = prd.prtid and prt.prtstatus = "1" and prd.prdstatus = "1" left join l_lottery_type lt on lt.ltid = prd.ltid and lt.ltstatus = "2" and lt.ltids = "LT010" left JOIN m_pay_rate pr ON pr.PRTID = prd.PRTID AND pr.LTID = prd.LTID order by prd.ltid, prd.prtid ';
    const data = await models.sequelize.query(sql, {
      type: models.sequelize.QueryTypes.SELECT
    });
  
    res.status(200).json({
      data: data
    });
}

exports.mpidck = async (req, res, next)=> {

  const {mpid} = req.body;
  const sql = 'select * from m_pay_rate WHERE mpid = "'+mpid+'"';
  const data = await models.sequelize.query(sql, {
    type: models.sequelize.QueryTypes.SELECT
  });

  res.status(200).json({
    data: data
  });
}

exports.insert = async (req, res, next)=> {
  try {

    const {ltid, prtid, rptop3, rpbot3, rptod3, rptop2, rpbot2, rptod2, rprtop, rprbot, mpid} = req.body;

    if (prtid=="") {
      const error = new Error("ไม่มีข้อมูล id");
      error.statusCode = 400;
      throw error;
    }

    //INSERT 
    const payrate = await models.Payrate.create({
      ltid : ltid,
      prtid: prtid,
      rptop3: rptop3,
      rpbot3: rpbot3,
      rptod3: rptod3,
      rptop2: rptop2,
      rpbot2: rpbot2,
      rptod2: rptod2,
      rprtop: rprtop,
      rprbot: rprbot,
      rpstatus: '1',
      mpid : mpid
    });

    res.status(201).json({
      message: 'เพิ่มข้อมูลเรียบร้อยแล้ว',
      data: {
        ltid : payrate.ltid,
        prtid : payrate.prtid
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
    const {ltid, prtid, rptop3, rpbot3, rptod3, rptop2, rpbot2, rptod2, rprtop, rprbot, mpid} = req.body;

    const mb = await models.Payrate.update({
      rptop3: rptop3,
      rpbot3: rpbot3,
      rptod3: rptod3,
      rptop2: rptop2,
      rpbot2: rpbot2,
      rptod2: rptod2,
      rprtop: rprtop,
      rprbot: rprbot
    }, {
      where: {
        ltid : ltid,
        prtid: prtid,
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