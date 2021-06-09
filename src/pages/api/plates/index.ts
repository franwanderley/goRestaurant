import { NextApiRequest, NextApiResponse } from "next";
import getModelPlates from '../models/Plates';

export default async (req: NextApiRequest, res: NextApiResponse) => {
   const Plates = getModelPlates();
   try{
      switch(req.method){
         case 'GET': {
            const data = await Plates.find();
            return res.json(data);
         };
         case 'POST': {
            const id = await Plates.create(req.body); 
            return res.json(id);
         };
      }
   }catch(error){
      console.log(error);
      return res.status(400).json(error); 
   }
}