const express = require('express');
const router = express.Router();



// Database
const {database} = require('../config/helpers')



/* GET ALL STUDENTS */
router.get('/', function(req, res){
  
  let page = (req.query.page != undefined && req.query.page != 0) ? req.query.page: 1; // set current page number
  const limit = (req.query.limit != undefined && req.query.limit != 0) ? req.query.limit: 10; // set limit of items per page

  let startValue;
  let endValue;

  if (page > 0)
  {
    startValue = (page * limit) - limit;
    endValue = page * limit;
  }else
  {
    startValue = 0;
    endValue = 10;
  }

  database.table('students as s')
  .withFields ([
    's.id',
    's.first_name',
    's.last_name',
    's.email',
    's.phone',
    's.address'
  ])
  .slice(startValue, endValue)
  .sort({id: .1})
  .getAll()
  .then(students =>{
    if(students.length > 0)
    {
      res.status(200).json({
        count: students.length,
        students: students
      })
    }else{
      res.status(404).json({message: 'No Students found.'});
    }
  }).catch(err => console.log(err));

  
});



/* GET SINGLE STUDENT */
router.get('/:sid', function(req, res){

  let student_id = req.params.sid; // get product id from params
  
  database.table('students as s')
  .withFields ([
    's.first_name',
    's.last_name',
    's.email',
    's.phone',
    's.address'
  ])
  .filter({'s.id' : student_id})
  .get()
  .then(student =>{
    if(student)
    {
      res.status(200).json(student)
    }else{
      res.status(404).json({message: `No record found for student with ID ${student_id}.`});
    }
  }).catch(err => console.log(err));

  
})



/* ADD STUDENT */
router.post('/:action', function(req, res){
  
  if(req.params.action = "new")
  {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.address;
    
    database.table('students')
    .insert ({
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      address: address    
    })
    .then(result => res.json({
      message: 'User Added successfully'
    })).catch(err => console.log(err));
  }

  
});



/* UPDATE STUDENT DATA */
router.patch('/:userId', async (req, res) => {
  let userId = req.params.userId;     // Get the User ID from the parameter

// Search User in Database if any
  let student = await database.table('students').filter({id: userId}).get();
  if (user) {

      let email = req.body.email;
      let address = req.body.address;
      let last_name = req.body.last_name;
      let first_name = req.body.first_name;
      let phone = req.body.phone;

      // Replace the student's information with the form data ( keep the data as is if no info is modified )
      database.table('students').filter({id: userId}).update({
          email: email !== undefined ? email : student.email,
          address: address !== undefined ? address : student.address,
          phone: phone !== undefined ? phone : student.phone,
          first_name: first_name !== undefined ? first_name : student.first_name,
          last_name: last_name !== undefined ? last_name : student.last_name
      }).then(result => res.json({
        message: 'Student updated successfully'
      })).catch(err => res.json(err));
  }
});




module.exports = router;

