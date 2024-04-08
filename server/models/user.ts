import mongoose from "mongoose"

export interface UserDocument extends mongoose.Document {
    name: string
    username: string
    passwordHash: string
    habits: mongoose.Types.ObjectId[]
}

const schema = new mongoose.Schema<UserDocument>({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    passwordHash: String,
    habits: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Habit"
        }
    ]
})

schema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

export default mongoose.model<UserDocument>("User", schema)