import { NextApiRequest, NextApiResponse } from "next";
import mongoose from '../database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
   try{
      switch(req.method){
         case 'GET': {
            const data = await mongoose.model('plates').find();
            return res.json(data);
         };
         case 'POST': {
            const id = await mongoose.model('plates').create(req.body); 
            return res.json(id);
         };
      }
   }catch(error){
      return res.status(400).json(error); 
   }
}