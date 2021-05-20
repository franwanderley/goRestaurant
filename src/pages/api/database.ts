import Mongoose from 'mongoose';

const mongoose = Mongoose;
const connect = 'mongodb+srv://root:sobral123@cluster0.czuzh.mongodb.net/gorestaurant?retryWrites=true&w=majority';
mongoose.connect(
   connect,
   {useNewUrlParser: true, useUnifiedTopology: true}
);
mongoose.Promise = global.Promise;

export default mongoose;
