import mongoose from 'mongoose';
const { Schema } = mongoose;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export default mongoose.model('Task', TaskSchema);