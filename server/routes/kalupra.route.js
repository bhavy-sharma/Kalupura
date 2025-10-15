import express from 'express';
import { Addcomplaint, Deletecomplaint, Getcomplaint } from '../controller/kalupra.controller';

const Router = express.Router();
//contant form ka routes
Router.route('/addcomplaint').post(Addcomplaint);
Router.route('/getcomplaint').get(Getcomplaint);
Router.route('/deletecomplaint').post(Deletecomplaint);

//

export default Router;