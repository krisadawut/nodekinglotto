const models = require('../models/index');

exports.index = async (req, res, next)=> {
  const sql = 'SELECT mtid, mtname, mtstatus, stdesc from l_member_type mt LEFT JOIN l_status st ON st.`STATUS` = mt.MTSTATUS where mt.mtstatus ="1"';
  const membertype = await models.sequelize.query(sql, {
    type: models.sequelize.QueryTypes.SELECT
  });

  // const membertype = await models.MemberType.findAll({
  // });

  res.status(200).json({
    data: membertype
  });
}

exports.getmaxid = async (req, res, next)=> {
  const sql = 'SELECT TRIM(CONCAT("MT", LPAD(CONVERT(SUBSTRING(MAX(mtid),3),UNSIGNED INTEGER)+1,3,0))) maxid from l_member_type';
  const membertype = await models.sequelize.query(sql, {
    type: models.sequelize.QueryTypes.SELECT
  });

  res.status(200).json({
    data: membertype
  });
}

exports.ddlmembertype = async (req, res, next)=> {
  const sql = 'SELECT mtid AS value, mtname AS viewValue from l_member_type WHERE mtstatus = "1"';
  const membertype = await models.sequelize.query(sql, {
    type: models.sequelize.QueryTypes.SELECT
  });

  res.status(200).json({
    data: membertype
  });
}


exports.insert = async (req, res, next)=> {
  try {
    let mtid = req.param('mtid');
    let mtname = req.param('mtname');
    let mtstatus = '1';
    if (mtid=="") {
      const error = new Error("ไม่มีข้อมูล id");
      error.statusCode = 400;
      throw error;
    }

    //insert user  INSERT 
    const membertype = await models.MemberType.create({
      mtid : mtid,
      mtname: mtname,
      mtstatus: mtstatus
    });

    res.status(201).json({
      message: 'เพิ่มข้อมูลเรียบร้อยแล้ว',
      data: {
        mtid : membertype.mtid,
        mtname : membertype.mtname
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
    let mtid = req.param('mtid');
    let mtname = req.param('mtname');
    let mtstatus = req.param('mtstatus');
    // const {mtid, mtname, mtstatus} = req.body;
    console.log('ddd ' + mtid+ ' ' +mtname, + ' ' +mtstatus);

    const mb = await models.MemberType.update({
      mtname : mtname,
    }, {
      where: {
        mtid:mtid,
        mtstatus: mtstatus
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
    let mtid = req.param('mtid');
    let mtstatus = req.param('mtstatus');
    // const {mtid} = req.body;
    console.log('ddd ' + mtid);

    const mb = await models.MemberType.update({
      mtstatus : mtstatus
    }, {
      where: {
        mtid:mtid
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