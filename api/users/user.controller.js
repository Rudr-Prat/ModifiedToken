const { create, getUserByUserId, deleteUser, updateUser,getUsers, getUserByUserEmail, signUp } = require("./user.service");
const {genSaltSync,hashSync,compareSync} = require("bcryptjs");
const { sign } = require("jsonwebtoken"); // This function is used to generate the token 
module.exports={
    createUser: (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt); //This technique is used for encrypting password
        // create(body,(err,results)=>{
        //     if(err)
        //     {
        //         console.log(err);
        //         return res.status(500).json({
        //             success:0,
        //             message:"Database Connection Error"
        //         });
        //     }
        //     return res.status(200).json({
        //         success:1,
        //         data: results
        //     });
        // });
        create(body).then((results)=>{
            res.status(200).json({
                    success:1,
                    data: results})}).catch((error)=>{console.log(err),
                res.status(500).json({
                    success:0,
                    message:"Database Connection Error"
                })}
        );
    },
    getUserByUserId:(req,res)=>{
        const id = req.param.id;
        // getUserByUserId(id, (err,results)=>{
        //     if(err){
        //         console.log(err);
        //         return;
        //     }
        //     if(!results){
        //         return res.json({
        //             success:0,
        //             message:"Record not found"
        //         });
        //     }
        //     return res.json({
        //         success:1,
        //         data:results
        //     });
        // });
    getUserByUserId(id).then((results)=>{
        res.json({
                success:1,
                data:results
            })}
        ).catch((error)=>{res.json({
                    success:0,
                    message:"Record not found"
                })}
        );
    },
    getUsers: (req,res)=>{
        // getUsers((err,results)=>{
        //     if(err)
        //     {
        //         console.log(err);
        //         return;
        //     }
        //     return res.json({
        //         success:1,
        //         data:results
        //     });
        // });
        getUsers().then((results)=>{
            res.json({
                    success:1,
                    data:results
                })}
            ).catch((error)=>{console.log(err)});
    },
    updateUser: (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt); //This technique is used for encrypting password
        // updateUser(body,(err,results)=>{
        //     if(err)
        //     {
        //         console.log(err);
        //         return res.status(500).json({
        //             success:0,
        //             message:"Database Connection Error"
        //         });
        //     }
        //     if(!results)
        //     {
        //         return res.json({
        //             success:0,
        //             message:"Database Connection Error"
        //         });
        //     }
        //     return res.status(200).json({
        //         success:1,
        //         message: "Updation successful"
        //     });
        // });
        updateUser().then((results)=>{
            res.status(200).json({
                    success:1,
                    message: "Updation successful"
                })}
            ).catch((error)=>{res.json({
                        success:0,
                        message:"Database Connection Error"
                    })});
    },
    deleteUser: (req,res)=>{
        const data = req.body;
        // deleteUser(data,(err,results)=>{
        //     if(err){
        //         console.log(err);
        //         return;
        //     }
        //     return res.json({
        //         success:1,
        //         message:"Record deleted successfully"
        //     });
        // });
        deleteUser(data).then((results)=>{res.json({
            success:1,
            message:"Record deleted successfully"
        })}
        ).catch((error)=>{console.log(err)});
    },
    login: (req,res)=>{
        const body = req.body;
        let jsontoken;
        // getUserByUserEmail(body.email, (error,results)=>{
        //     if(error){
        //         console.log(error);
        //     }
        //     if(!results){
        //         return res.json({
        //             success:0,
        //             message: "Invalid email or Token"
        //         });
        //     }
            // const result = compareSync(body.password, results.password) // This is used to compare the query returned password with the password input by the user, tyhe funciton will return the boolean value
        //     if(result){
        //         results.password = undefined;
        //         const jsontoken = sign({result, results},"qwe1234",{expiresIn:"1h"});  
        //         //The second parameter is the key using which we encrypt and decrypt the token, 
        //         // the last parameter describes the validity of the token
        //         return res.json({
        //         success:1,
        //         message:"Login Successfully",
        //         token:jsontoken
        //     });
    //     else{
    //         return res.json({
    //             success:0,
    //             message: "Invalid email or Token"
    //         });
    //     }
    // });
            getUserByUserEmail(body.email).then((results)=>{
                console.log("Inside Controller login");
                result = compareSync(body.password, results.password);
                if (result)
                {
                results.password = undefined,
                jsontoken = sign({result, results},"qwe1234",{expiresIn:"1h"}), 
                //The second parameter is the key using which we encrypt and decrypt the token, 
                // the last parameter describes the validity of the token
                res.json({
                success:1,
                message:"Login Successfully",
                token:jsontoken
            })
            }
        })
            .catch((error)=>{
                res.json({
                success:0,
                message: "Invalid email or Token"
            })});
            },
    SignUp: (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt); //This technique is used for encrypting password
        // signUp(body,(err,results)=>{
        //     if(err)
        //     {
        //         console.log(err);
        //         return res.status(500).json({
        //             success:0,
        //             message:"Database Connection Error"
        //         });
        //     }
        //     return res.status(200).json({
        //         success:1,
        //         data: results
        //     });
        // });
        signUp(body).then((results)=>{res.status(200).json({
            success:1,
            data: results
        })}).catch((error)=>{res.status(500).json({
            success:0,
            message:"Database Connection Error"
        })});
    }
};