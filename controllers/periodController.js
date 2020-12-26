const models = require('../models/index');

exports.index = async (req, res, next)=> {
  const data = await models.Period.findAll({
    where: {
      prstatus: '1'
    }
  });

  res.status(200).json({
    data: data
  });
}

exports.getmaxid = async (req, res, next)=> {
  const sql = 'SELECT TRIM(CONCAT("PR", LPAD(CONVERT(SUBSTRING(MAX(prid),3),UNSIGNED INTEGER)+1,8,0))) maxid from l_period';
  const data = await models.sequelize.query(sql, {
    type: models.sequelize.QueryTypes.SELECT
  });

  res.status(200).json({
    data: data
  });
}


exports.insert = async (req, res, next)=> {
  try {

    const {prid, prdesc} = req.body;
    // let prid = req.param('prid');
    // let prdesc = req.param('prdesc');
    // let prstatus = '1';

    if (prid=="") {
      const error = new Error("ไม่มีข้อมูล id");
      error.statusCode = 400;
      throw error;
    }

    //insert user  INSERT 
    const Period = await models.Period.create({
        prid : prid,
        prdesc: prdesc,
        prstatus: '1'
    });

    res.status(201).json({
      message: 'เพิ่มข้อมูลเรียบร้อยแล้ว',
      data: {
        prid : Period.prid,
        prdesc : Period.prdesc
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
    let prid = req.param('prid');
    let prdesc = req.param('prdesc');
    let prstatus = req.param('prstatus');
    // const {prid, prdesc, prstatus} = req.body;
    console.log('Period ' + prid+ ' ' +prdesc, + ' ' +prstatus);

    const mb = await models.Period.update({
      prdesc : prdesc,
    }, {
      where: {
        prid: prid,
        prstatus: prstatus
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
    let prid = req.param('prid');
    let prstatus = req.param('prstatus');

    console.log('prid ' + prid);
    console.log('prstatus ' + prstatus);

    const upd = await models.Period.update({
      prstatus : prstatus
    }, {
      where: {
        prid: prid
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
