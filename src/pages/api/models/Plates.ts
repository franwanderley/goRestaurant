import mongoose from '../database';
import { Schema } from 'mongoose';

const PlateSchema = new Schema({
       image: {
          type: String,
          require: true,
       },
       title: {
          type: String,
          require: true,
          unique: true,
       },
       price: {
          type: String,
          require: true,
       },
       description: {
          type: String,
          require: true,
       },
       isAvaliable: {
          type: Boolean,
          default: true,
       },
       category: {
         type: [String]
       },
    });
    PlateSchema.path('_id');


export default function getModelPlates(){
   try{
      return mongoose.model('plates', PlateSchema);
   }catch(err){
      return mongoose.model('plates');
   }
}
