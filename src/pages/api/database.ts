import mongoose from 'mongoose';
const connect = process.env.REACT_APP_MONGODB;

mongoose.connect(connect,{
   useNewUrlParser: true,
   useUnifiedTopology: true, 
   useFindAndModify: true,
   useCreateIndex: true
});
mongoose.Promise = global.Promise;

export default mongoose;
