const e = require('express');
const models = require('../models/index');
const user = require('../models/user');
const bcryptjs = require('bcryptjs');
exports.index = async (req, res, next)=> {

  // const users = await models.User.findAll({
  //   attributes:['id', 'name', 'email', 'create_dt'],
  //   order: [['id', 'desc']]
  // });

  // const users = await models.User.findAll({
  //   attributes:{exclude:['password']},
  //   where : {
  //     email: 'joy@gmail.com'
  //   },
  //   order: [['id', 'desc']]
  // });

  // const users = await models.User.findAll({
  //   attributes:['id', 'name', ['email', 'username'], 'create_dt'],
  //   order: [['id', 'desc']]
  // });


  // const sql = 'select id, name, email, create_dt from users';
  // const users = await models.sequelize.query(sql, {
  //   type: models.sequelize.QueryTypes.SELECT
   
  // });

    const users = await models.User.findAll({
    attributes:{exclude:['password']},
    include : [
      {
        model: models.Blog,
        as: 'blogs',
        attributes: ['id', 'title']
      }
    ],
    order: [
      ['id', 'desc'],
      ['blogs', 'id', 'desc']
    
    ]
  });

  res.status(200).json({
        data: users
  });
}

exports.show = async (req, res, next)=> {
  try {
    const {id} = req.params;
    const user = await models.User.findByPk(id ,{
      attributes:{exclude:['password']}
    });

    if (!user) {
      const error = new Error('ไม่พบผู้ใฃ้');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
          data: user
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      error : {
        message : error.message
      }
    });
  }

}

exports.insert = async (req, res, next)=> {
  try {
    const {name, email, password} = req.body;
    //mail dup
    const existEmail = await models.User.findOne({ where: {email :email}});

    if (existEmail) {
      const error = new Error("มี email แล้ว");
      error.statusCode = 400;
      throw error;
    }

    //has pass
    const salt = await bcryptjs.genSalt(8);
    const passHas = await bcryptjs.hash(password, salt);
    //insert user
    const user = await models.User.create({
      name : name,
      email: email,
      password: passHas
    });

    res.status(201).json({
      message: 'เพิ่มข้อมูลเรียบร้อยแล้ว',
      data: {
        id : user.id,
        email : user.email
      }
    });
  } catch (error) {nom 
    return res.status(error.statusCode).json({
      error : {
        message : error.message
      }
    });
  }
}

//update
exports.update = async (req, res, next)=> {
  try {
    const {id, name, email, password} = req.body;
   
    if (req.params.id != id) {
      const error = new Error("รหัสผู้ใช้ไม่ถูกต้อง");
      error.statusCode = 400;
      throw error;
    }

    //has pass
    const salt = await bcryptjs.genSalt(8);
    const passHas = await bcryptjs.hash(password, salt);
    //insert user
    const user = await models.User.update({
      name : name,
      email: email,
      password: passHas
    }, {
      where: {
        id:id
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

//destroy
exports.destroy = async (req, res, next)=> {
  try {
    const {id} = req.params;
    const user = await models.User.findByPk(id);

    if (!user) {
      const error = new Error('ไม่พบผู้ใฃ้');
      error.statusCode = 404;
      throw error;
    }

    //delete
    await models.User.destroy({
      where: {
        id: id
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