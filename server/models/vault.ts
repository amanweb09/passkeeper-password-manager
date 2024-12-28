import { Schema, model } from "mongoose"

const vaultSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        unique: true,
        required: true
    },
    vault: {
        type: String,
        required: true
    },
    iv: {
        type: String,
        required: false
    },
    vaultHash: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

const vault = model("user", vaultSchema, "user")
export default vault