import convertHourToMinutes from "../utils/convertHourToMinutes";
import { Request, Response } from 'express';
import db from '../database/connection';

interface ScheduleItem {
    Week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {

    async index(request: Request, response: Response) {
        const filter = request.query;

        const Week_day = filter.Week_day as string;
        const subject = filter.subject as string;
        const time = filter.time as string; 

        if (!filter.Week_day || !filter.subject || !filter.time) {
            return response.status(400).json({
                error: 'Missing filters'
            })
        }
        const timeInMinutes = convertHourToMinutes(time)

        const classes = await db('classes')
        .whereExists(function(){
            this.select('class_schedule.*')
            .from('class_schedule')
            .whereRaw('`class_schedule`.`class_id` = `classes`.`id`') 
            .whereRaw('`class_schedule`.`Week_day` = ??',[Number(Week_day)])
            .whereRaw('`class_schedule`.`from` <= ??',[timeInMinutes])
            .whereRaw('`class_schedule`.`to` > ??',[timeInMinutes])

        })
        .where('classes.subject', '=', subject)
        .join('users','classes.user_id', '=', 'users.id' )
        .select(['classes.*','users.*']);

        response.json(classes);
    }

    async create(request: Request, response: Response) {

        const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body;

        const trx = await db.transaction();

        try {
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            })

            const user_id = insertedUsersIds[0];

            const insertedClassesId = await trx('classes').insert({
                subject,
                cost,
                user_id,
            })

            const class_id = insertedClassesId[0];

            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    Week_day: scheduleItem.Week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                };
            })

            await trx('class_schedule').insert(classSchedule)

            trx.commit();

            return response.status(201).send();

        } catch (error) {

            await trx.rollback();

            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }

    }
}