import express from 'express';
import {AddComplaint, AddInfoVillage, AddSpecialEvent, DeleteComplaint, GetComplaints, GetInfoVillage, GetSpecialEvent } from '../controller/kalupra.controller.js';

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


export default Router;