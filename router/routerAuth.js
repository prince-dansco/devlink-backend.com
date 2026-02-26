import express from 'express';
import { Login , Logout ,  Register} from "../controller/AuthController.js"; 
const router = express.Router();

router.post("/login", Login);
router.post("/logout", Logout);
router.post("/register", Register);

export { router as routerAuth };