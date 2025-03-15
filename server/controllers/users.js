import User from "../models/User.js";
import Group from "../models/Group.js";
/* Read */
export const getUser = async (req, res) => {
    try {

        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUserByUsername = async (req, res) => {
    try {
        const { userName } = req.params;
        console.log(userName);
        const user = await User.findOne({ userName: userName });
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUserGroups = async (req, res) => {
    try{
        const{id} = req.params;
        const user = await User.findById(id);

        const groups = await Promise.all(
            user.groups.map((id) => User.findById(id)) /* need to be re visted for when creating groups */
        );
        const formattedgroups = groups.map(
            ({_id, userId, groupName })
        );
        res.status(200).json(formattedgroups);
    }catch(err){
        res.status(404).json({ message: err.message });
    }
};

/* Update */
export const addRemoveFromGroup = async (req, res) => {
    try {
        const { id, groupId } = req.params;
        const user = await User.findById(id);
        const group = await Group.findById(groupId);

        if (user.groups.includes(groupId)) {
        user.groups = user.groups.filter((id) => id !== groupId);
        group.userId = group.userId.filter((id) => id !== id);
        } else {
        user.groups.push(groupId);
        group.userId.push(id);
        }
        await user.save();
        await group.save();

        const groups = await Promise.all(
        user.groups.map((id) => User.findById(id)) /* need to be re visted for when creating groups */
        );
        const formattedgroups = groups.map(
        ({_id, userId, groupName })
        );

        res.status(200).json(formattedgroups);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
  };
