const models = require('../models/index');

exports.index = async (req, res, next)=> {
  const news = await models.News.findAll({
    where : {
      nstatus : '1'
    }
  });

  res.status(200).json({
    data: news
  });
}

exports.getmaxid = async (req, res, next)=> {
  const sql = 'SELECT TRIM(CONCAT("NW", LPAD(CONVERT(SUBSTRING(MAX(nid),3),UNSIGNED INTEGER)+1,4,0))) maxid from l_news';
  const news = await models.sequelize.query(sql, {
    type: models.sequelize.QueryTypes.SELECT
  });

  res.status(200).json({
    data: news
  });
}


exports.insert = async (req, res, next)=> {
  try {

    const {nid, ntitle, ndesc} = req.body;
    // let nid = req.param('nid');
    // let ntitle = req.param('ntitle');
    // let ndesc = req.param('ndesc');
    // let nstatus = '1';

    if (nid=="") {
      const error = new Error("ไม่มีข้อมูล id");
      error.statusCode = 400;
      throw error;
    }

    //insert user  INSERT 
    const News = await models.News.create({
      nid : nid,
      ntitle: ntitle,
      ndesc: ndesc,
      nstatus:'1'
    });

    res.status(201).json({
      message: 'เพิ่มข้อมูลเรียบร้อยแล้ว',
      data: {
        nid : News.nid,
        ntitle : News.ntitle
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
    let nid = req.param('nid');
    let ntitle = req.param('ntitle');
    let ndesc = req.param('ndesc');
    // const {lsid, lsdesc, ltid, prid} = req.body;
    const mb = await models.News.update({
      ntitle: ntitle,
      ndesc: ndesc
    }, {
      where: {
        nid: nid
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
    let nid = req.param('nid');
    let nstatus = req.param('nstatus');
    console.log('nid ' + nid);
    console.log('nstatus ' + nstatus);

    const upd = await models.News.update({
      nstatus : nstatus
    }, {
      where: {
        nid: nid
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
