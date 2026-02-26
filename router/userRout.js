import express from "express";
import { updateLinks ,editSingleLink, getPublicProfile , deleteLink, updateProfile, getUserProfile} from "../controller/UserController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadImage } from "../middleware/upload.js";

const router = express.Router();

router.get("/profile", protect  , getUserProfile)
router.put("/update-links", protect, updateLinks);
router.patch("/update-one/:linkId", protect,  editSingleLink);
router.delete("/delete-one/:linkId", protect, deleteLink);
router.put("/update-profile", protect, uploadImage.single('profileImage'), updateProfile);
router.get("/public/:userId", getPublicProfile);


export { router as userRouter };