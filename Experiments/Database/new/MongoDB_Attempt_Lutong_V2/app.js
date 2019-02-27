const Post = require('./Post.js');
const Get = require('./Get');
const Delete = require('./Delete');


   
   //Get the messages from a particular user
   var filter = {username:"Alex" };
   Get.get_information(filter,"ACCENTURE_TEST1","USER_INFORMATION");
   
   var new_request = {
	Name:"Andyyyyy",
	Email:"Andy@gmail.com",
	Contact_Number: 87766777,
	Topic_Chosen: "API Devops",
	Message:"Hi! May I ask how do you charge for your XXX API service specifically?"
}

   //Post-insert a single document (Here is insert one user request)
	Post.post_new_request(new_request,"ACCENTURE_TEST1","USER_INFORMATION");
	

	//Delete a user request accroding to the user's name
	var filter1 = { username:"Alex" };
	Delete.delete_one_request(filter1,"ACCENTURE_TEST1","USER_INFORMATION");





   




