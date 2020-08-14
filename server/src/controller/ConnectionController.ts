import db from "../database/connection";
import {Request,Response} from 'express';


export default  class ConnectionController{

        async index(req: Request, res: Response){
            try {
                const totalConex = await db('connections').count('* as total');
                const {total} = totalConex[0];
                res.status(201).json({total: total});
            } catch (error) {
                res.status(400).json({msg: error});
            }
        }

        async store(req: Request, res: Response){
            const {user_id} = req.body;

            try {
                await db('connections').insert({user_id});
                res.status(201).json({msg: 'Conexão Criada'});
            } catch (error) {
                res.status(400).json({msg: 'Conexão Não Criada'});
            }
        
        }
}
