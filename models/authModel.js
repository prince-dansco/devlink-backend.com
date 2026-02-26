import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
email: { type: String, required: [true, "Email is required"], unique: true ,},
 password: { type: String, required: [true, "password is required"],
        
        minlength: [5, 'password must have more than 5 characters']
     },
   
firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    profileImage: { type: String, default: "" },

    links: [
        {
            platform: { 
                type: String, 
                required: true,
                enum: {
                    values: [
                        'GitHub', 
                        'Frontend Mentor', 
                        'Twitter', 
                        'LinkedIn', 
                        'YouTube', 
                        'Facebook', 
                        'Twitch', 
                        'Dev.to', 
                        'Codewars', 
                        'freeCodeCamp'
                        
                    ],
                    message: '{VALUE} is not a supported platform'
                }
            },
            url: { 
                type: String, 
                required: true,
                trim: true
            }
        }
    ]



}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;
