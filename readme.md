## DOCUMENTATION

Port: 3000
server: localhost

<!-- Adding new Student -->
Method: POST
URL: http://localhost:3000/api/students
parameters: action = 'new'

<!-- View Students: -->
Method: GET
URL: http://localhost:3000/api/students


<!-- View single Students: -->
Method: GET
URL: http://localhost:3000/api/students/
parameters: id = 'student_id'

<!-- Update Student Data-->
Method: PATCH
URL: http://localhost:3000/api/students
parameters: action = 'update'

