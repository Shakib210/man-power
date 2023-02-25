import express from 'express';
import {userController,signupController, loginController, userLoader,isAdminController,makeAdmin} from '../controller/userController.js'
import { handleValidations } from '../middlewares/handleValidation.js';
import permit from '../middlewares/permit.js';
import validators from '../validators/index.js'

const router = express.Router();

router.route('/').get(permit('user'),userController)
router.route('/loaduser').get(permit('user'),userLoader)
router.route('/signup').post(handleValidations(validators.registerValidation),signupController)
router.route('/login').post(handleValidations(validators.loginValidation),loginController)
router.route('/admin').post(isAdminController)
router.route('/makeadmin').post(makeAdmin)

const configure = (app) => {
    app.use('/api/user', router);
  }; 

  export default configure;