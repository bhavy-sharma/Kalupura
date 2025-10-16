import express from 'express';
import {AddComplaint, AddInfoVillage, addMembersToFamily, AddSpecialEvent, createUser, DeleteComplaint, GetComplaints, GetInfoVillage, GetSpecialEvent, getAllUsers, loginUser } from '../controller/kalupra.controller.js';

const Router = express.Router();
//contant form ka routes
Router.route('/addcomplaint').post(AddComplaint);
Router.route('/getcomplaint').get(GetComplaints);
Router.route('/deletecomplaint').post(DeleteComplaint);

//special event routes
Router.route('/addevent').post(AddSpecialEvent);
Router.route('/getevent').get(GetSpecialEvent);

//village info routes
Router.route('/addinfovillage').post(AddInfoVillage);
Router.route('/getinfovillage').get(GetInfoVillage);

//user routes
 Router.route('/createuser').post(createUser);
 Router.route('/getallusers').get(getAllUsers);
 Router.route('/updatemember').post(addMembersToFamily);

 //login route
 Router.route('/login').post(loginUser);



export default Router;