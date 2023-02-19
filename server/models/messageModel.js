import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    user : {
        type : String,
        required : true
    },
    text : {
        type : String,
        required : true
    }
},{
    timestamps : true
});

export default mongoose.model('msgs', messageSchema);