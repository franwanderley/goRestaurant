import mongoose from '../database';

const schema = mongoose.Schema;
export const PlateSchema = new schema({
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
   });
   PlateSchema.path('_id');
   export const Plates = mongoose.models.Plates || mongoose.model('plates', PlateSchema);   
