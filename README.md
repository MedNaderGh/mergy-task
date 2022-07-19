# mergy-task
# mergy-task
The app is built with Node.js and express.js as a framework
it contains 6 apis
#Signup
POST localhost:3000/user/register
BODY : { "email":"email",
"password":"password"}
#SIGNIN
POST localhost:3000/user/authenticate
BODY : { "email":"email",
"password":"password"}
Response:
JWT Bearer
#Create (Create a user and add it the Atlas Mongodb database)
localhost:3000/user/create
BODY : {
"id":"ahd123@zod", // can contain number, characters and symbols
"name":"username", // only characters no symbols or numbers
"email":"username@gmail.com", // can contain numbers and characters
"job":"userjob", // only characters no symbols or numbers
"cv":"url", // contain url to a cv doc
"user_image":"url", // contain url for image
"experience":[ // array of object contain experiences
{
"job_title":"title", // only characters no symbols or numbers
"location":"location", // contain location
"start_date":"date", // contain date in date format (dd/mm/yyyy)
"end_date":"date" // contain date in date format (dd/mm/yyyy)
},
{
"job_title":"title",
"location":"location",
"start_date":"date",
"end_date":"date"
}
]
}
Header : Authorization : JWT JWT_String
Response :
Unauthorized in case of an unvalid JWT
error message in case of bad format
JSON data in case of a valid creation
#Get (Retrieve a specific user by id)
GET localhost:3000/user/get/:id
url params : id
Header : Authorization : JWT JWT_String
response : 
Unauthorized in case of an unvalid JWT
[] if no user with the specific ID found
JSON data if user found
#Getall (Retrieve all users)
GET localhost:3000/user/getall
response : 
Unauthorized in case of an unvalid JWT
[] if no user found
JSON data if users found
#update 
Header : Authorization : JWT JWT_String
PATCH localhost:3000/user/update/:id
url params : id
Body : same as create
response : 
Unauthorized in case of an unvalid JWT
error message in case of bad format
JSON data in case of a valid creation
#delete
delete localhost:3000/user/delete/:id
Header : Authorization : JWT JWT_String
url params : id
response : 
Unauthorized in case of an unvalid JWT
error message if user not found
JSON data in case of a valid delete
