const pool = require("../../config/database")
module.exports = {
    create: (data) =>{
    return new Promise((resolve,reject)=>{
        pool.query(
        `insert into registration (firstName, lastName, gender, email, password, number)
        values(?,?,?,?,?,?)`,
    [
        data.firstName,
        data.lastName,
        data.gender,
        data.email,
        data.password,
        data.number
    ],
    (error,results,fields)=>{
        if(error)
        {
            return reject(error);
        }
        return resolve(results);
    }
    )});        
    },
    getUsers: ()=>{
       return new Promise((resolve,reject)=>{pool.query(
            `select firstName, lastName, gender, email, number from registration`,
            [],
            (error,results,fields)=>{
                if(error)
                {
                    return reject(error);
                }
                return resolve(results);
            }
        )});
    },
    getUserByUserId: (id)=>{
       return new Promise((resolve,reject)=>{

            pool.query(
            `select id, firstName, lastName, email, number from registration where id= ?`,
            [id],
            (error,results,fields)=>{
                if(error)
                {
                    return reject(error);
                }
                return resolve(results);
            }
        )});
    },
    updateUser: (data) =>{
        return new Promise((resolve,reject)=>{
            pool.query(
            `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where email = ?`,
        [
            data.firstName,
            data.lastName,
            data.gender,
            data.email,
            data.password,
            data.number
        ],
        (error,results,fields)=>{
            if(error)
            {
                return reject(error);
            }
            return resolve(results[0]);
        }
        )});        
        },
    deleteUser: (data)=>{
        return new Promise((resolve,reject)=>{
            pool.query(
            `delete from registration where id=?`,
            [data.id],
            (error,results,fields)=>{
                if(error)
            {
                return reject(error);
            }
            return resolve(results[0]);
            }
        )});
    },
    getUserByUserEmail:(email)=>{
        return new Promise((resolve,reject)=>{
            pool.query(
            `select * from registration where email = ? `,
            [email],
            (error,results,fields)=>{
                if(error){
                            return reject(error);
                        }
                        console.log('resolved from service');
                        return resolve(results[0]);
            }) 
        }
            // (error,results,fileds)=>{
            //     if(error){
            //         return callback(error);
            //     }
            //     return callback(null,results[0]);
            // }
        );
    },
    signUp: (data) =>{
        console.log("Inside Signup")
        return new Promise((resolve,reject)=>{
            pool.query(
            `insert into registration (firstName, lastName, gender, email, password, number)
            values(?,?,?,?,?,?)`,
        [
            data.firstName,
            data.lastName,
            data.gender,
            data.email,
            data.password,
            data.number
        ],
        (error,results,fields)=>{
            if(error)
            {
                return reject(error);
            }
            return resolve(results);
        }
        )});        
        }
};