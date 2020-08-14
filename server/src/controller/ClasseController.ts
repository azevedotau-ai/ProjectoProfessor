import db from "../database/connection";
import Converter from "../utils/ConverteHoursToMin";
import {Request,Response} from 'express';

interface SchadelItem{
    week_day:number;
    from: string;
    to: string;
 }

export default  class ClasseController{

        async index(req: Request, res: Response){
            const filtro = req.query;

            const week_day = filtro.week_day as string;
            const subject = filtro.subject as string;
            const time = filtro.time as string;

            try {
                if(!filtro.week_day || !filtro.subject || !filtro.time){
                    res.status(400).json({msg: "Erro Sem Campos Para Filtrar"});
                }else{
                    const tempoEmMinutos = Converter(time);
    
                    const classes = await db('classes')
                          .whereExists(function(){
                              this.select('classes_schadule.*')
                                  .from('classes_schadule')
                                  .whereRaw('`classes_schadule`.`class_id`=`classes`.`id`')
                                  .whereRaw('`classes_schadule`.`week_day`= ??',[Number(week_day)])
                                  .whereRaw('`classes_schadule`.`from`<= ??',[tempoEmMinutos])
                                  .whereRaw('`classes_schadule`.`to` > ??',[tempoEmMinutos])
                          })
                          .where('classes.subject','=',subject)
                          .join('users','classes.user_id' ,'=', 'users.id')
                          .select(['classes.*','users.*']);
                    
                    res.status(201).json(classes);
                }
            } catch (error) {
                res.status(400).json({erro: error});
            }
        }

        async store(req: Request, res: Response){
            const {
                primeiroNome,
                ultimoNome,
                avatar,
                whatsapp,
                bibliografia,
                subject,
                cost,
                schadule
            } = req.body;
        
            const trx = await db.transaction();
            
            try {
                const insertedUsersId = await trx('users').insert({
                    primeiroNome,
                    ultimoNome,
                    avatar,
                    whatsapp,
                    bibliografia 
                    });
                
                    const user_id = insertedUsersId[0];
                
                    const insertedClassesId = await trx('classes').insert({
                        subject,
                        cost,
                        user_id
                    });
                
                    const class_id = insertedClassesId[0];
                
                    const classSchadule = schadule.map((el: SchadelItem) =>{
                        return {
                            class_id,
                            week_day: el.week_day,
                            from: Converter(el.from),
                            to: Converter(el.to)
                        };
                    })
                
                    await trx('classes_schadule').insert(classSchadule);
                
                    await trx.commit();
                    
                    res.status(201).json({msg: "Cadastro Feito Com Sucesso"});
            } catch (error) {
                await trx.rollback();
                res.status(400).json({msg:"Erro ao Criar Classe"});
            }
        
        }
}
