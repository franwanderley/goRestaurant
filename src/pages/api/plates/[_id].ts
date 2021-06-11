import { NextApiRequest, NextApiResponse } from "next";
import getModelPlates from '../models/Plates';

export default async (req: NextApiRequest, res: NextApiResponse) => {
   const Plates = getModelPlates();
   const { _id } = req.query;
   if(!_id){
      return res.status(400).json('Id nulo!');
   }
   try{
      switch(req.method){
         case 'GET': {
            const data = await Plates.findById(_id).exec();
            if(!data)
               return res.status(500).json('Não existe produto com este id!');
            return res.json(data);
         };
         case 'PUT': {
            console.log('PUT');
            const data = req.body;
            const result = await Plates.updateOne({_id : _id}, data);
            
            return res.json(result);
         };
         case 'DELETE': {
            const result = await Plates.deleteOne({_id: _id})
            return res.json(result);
         };
      }
   }catch(err){
      console.log('Erro no BackEnd');
      console.log(err);
      return res.status(400).json(err); 
   }
}