import mongoose from "mongoose";

const JoinInnerCircleSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    linkedin: { type: String },
    email: { type: String, required: true },
    message: { type: String },
  },
  { timestamps: true }
);

// ✅ Use model name "JoinInnerCircle"
export default mongoose.models.JoinInnerCircle ||
  mongoose.model("JoinInnerCircle", JoinInnerCircleSchema);
