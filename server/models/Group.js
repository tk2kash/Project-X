import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema(
    {
        userId:[{
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: false,
            
        }],
        groupName:{
            type: String,
            min: 2,
            max: 50,
        }
    },{timestamps: true}
    );
const Group = mongoose.model("Group", GroupSchema);
export default Group;
    