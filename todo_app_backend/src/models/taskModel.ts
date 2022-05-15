import mongoose from 'mongoose'

export interface TaskDocument extends mongoose.Document {
    title: String,
    activeState: Boolean,
    endDate: Date
    createdAt: Date,
    updatedAt: Date
}

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        activeState: {
            type: Boolean,
            default: true
        },
        endDate: {
            type: Date,
            default: new Date()
        }
    },
    {
        timestamps: true
    }
)

const TaskModel = mongoose.model("Task", taskSchema)
export default TaskModel
