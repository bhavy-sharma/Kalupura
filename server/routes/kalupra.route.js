import express from 'express';
import {AddComplaint, AddInfoVillage, addMembersToFamily, AddSpecialEvent, createUser, DeleteComplaint, GetComplaints, GetInfoVillage, GetSpecialEvent, getAllUsers, loginUser, updateUserStatus, DeleteInfoVillage, DeleteSpecialEvent, getUserById, createMember, saveChatMessage, getAllChatMessages } from '../controller/kalupra.controller.js';

const Router = express.Router();
//contant form ka routes
Router.route('/addcomplaint').post(AddComplaint);
Router.route('/getcomplaint').get(GetComplaints);
Router.route('/deletecomplaint').post(DeleteComplaint);

//special event routes
Router.route('/addevent').post(AddSpecialEvent);
Router.route('/getevent').get(GetSpecialEvent);
Router.route('/deleteevent/:id').delete(DeleteSpecialEvent);

//village info routes
Router.route('/addinfovillage').post(AddInfoVillage);
Router.route('/getinfovillage').get(GetInfoVillage);
Router.route('/deleteinfovillage/:id').delete(DeleteInfoVillage);

//user routes
 Router.route('/createuser').post(createUser);
 Router.route('/cerateMember').post(createMember);
 Router.route('/getallusers').get(getAllUsers);
 Router.route('/updatemember').patch(addMembersToFamily);
 Router.route('/updateisEnabled/:id').patch(updateUserStatus);
 Router.route('/getuserbyid/:id').get(getUserById)

 //login route
 Router.route('/login').post(loginUser);

 //chat routes can be added 
 Router.route('/addchat').post(saveChatMessage);
 Router.route('/getchat').get(getAllChatMessages);



export default Router;