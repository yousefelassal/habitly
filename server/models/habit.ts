import mongoose from "mongoose"

export interface HabitDocument extends mongoose.Document {
    name: string
    description: string
    color: string
    icon: string
    user: mongoose.Types.ObjectId
}

const schema = new mongoose.Schema<HabitDocument>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    color: {
        type: String
    },
    icon: {
        type: String
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

schema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
    }
})

export default mongoose.model<HabitDocument>("Habit", schema)