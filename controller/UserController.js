import User from "../models/authModel.js";

export const updateLinks = async (req, res) => {
  try {
    const { links } = req.body;
    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { links: { $each: links } } 
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Links added successfully",
      links: updatedUser.links,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteLink = async (req, res) => {
    try {
        const { linkId } = req.params; 
       const userId = req.user.id;

       const updatedUser = await User.findByIdAndUpdate(
            userId, { $pull: { links: { _id: linkId } } },  { new: true }
        );
            if (!updatedUser) {
                res.status(404).json({message: 'user not found'});}

       res.status(200).json({message: "Link deleted successfully", links: updatedUser.links });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error, "server error")
    }
};

export const editSingleLink = async (req, res) => {
    try {
        const { linkId } = req.params; 
        const { platform, url } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { _id: req.user.id, "links._id": linkId },
            { 
                $set: { 
                    "links.$.platform": platform, 
                    "links.$.url": url 
                } 
            },
            { new: true, runValidators: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User or Link not found" });
        }

        res.status(200).json(updatedUser.links);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { firstName, lastName, email } = req.body;

        let updateData = { firstName, lastName, email };

        if (req.file) {
            updateData.profileImage = req.file.path; 
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId, { $set: updateData },{ new: true, runValidators: true }
        ).select("-password");

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Profile fetched successfully",  user: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error, "server error");
        
    }
}

export const getPublicProfile = async (req, res) => {
    try {
        const { userId } = req.params;
      const user = await User.findById(userId)
            .select("firstName lastName profileImage links email")
            .lean();
        if (!user) {
            return res.status(404).json({ message: "Profile not found" });
        }
     res.status(200).json({message: "Public profile loaded",profile: { firstName: user.firstName, 
        lastName: user.lastName, 
        profileImage: user.profileImage,
                email: user.email,
                links: user.links 
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Invalid profile ID" });
    }

}