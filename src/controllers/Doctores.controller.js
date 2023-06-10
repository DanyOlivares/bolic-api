import{getConnection,sql,queries} from '../database'

export const getDoctores = async(req, res) => {
    try{
        const pool= await getConnection();
        const result= await pool.request().query(queries.getAllDoctors);
        res.json(result.recordset);
    }
    catch(error){
        res.status(500)
        res.send(error.message)
    }
};

export const addDoctor = async(req, res) => {
    const { correo, username, contraseña }= req.body
    if (correo==null || username ==null || contraseña==null){
        return res.status(400).json({msg: "MAL request, llena todo porfa"})
    }
    console.log(correo,username, contraseña)
    
    try{
        const pool=await getConnection()
        await pool.request()
        .input("correo",sql.VarChar,correo)
        .input("username",sql.VarChar,username)
        .input("contraseña",sql.VarChar,contraseña)
        .query(queries.insDoctors)
        res.json({correo, username, contraseña})
    }
    catch{
        res.status(500)
        res.send(error.message)
    }
}

export const getDoctorbyID=async(req, res) => {
    const{id}=req.params
    const pool=await getConnection()
    const result = await pool.request().input("ID",id).query(queries.getbyId)
    res.json(result.recordset[0])

}

export const deleteDoctorbyId=async(req, res) => {
    const{id}=req.params
    const pool=await getConnection()
    const result = await pool.request().input("ID",id).query(queries.deleteDoctorsId)
    res.sendStatus(204)

}


export const getTotalDoctors=async(req, res) => {
    const pool=await getConnection()
    const result = await pool.request().query(queries.getTotalDoctors)
    res.json(result.recordset[0][''])

}

export const actDoctorbyId =async(req, res) => {
    const {correo,username,contraseña}=req.body
    const{id} =req.params

    if (correo==null || username ==null || contraseña==null){
        return res.status(400).json({msg: "MAL request, llena todo porfa"})
    }
    console.log(typeof username)
    console.log(username.length)
    if (username.length>10){
        return res.json({"message":"por favor ingresa menos caracteres en username"})
    }
    try{
        const pool= await getConnection()
        const result=await pool.request().input('correo',sql.VarChar,correo)
        .input('username',sql.VarChar,username)
        .input('contraseña',sql.VarChar,contraseña)
        .input('id',sql.Int,id)
        .query(queries.updateDoctorbyId)
        console.log(result)
        res.json({correo,username,contraseña})
    }
    catch(error){
        res.status(500)
        res.send(error.message)
    }

}


export const addusername = async(req, res) =>{
    const {username}=req.body
    if (username ==null){
        return res.status(400).json({msg: "MAL request, llena todo porfa"})
    }
    try{
        const pool= await getConnection()
        const result=await pool.request().input('username',sql.VarChar,username)
        .query(queries.addUserpr)
        console.log(result)
        res.json({username})
    }
    catch(error){
        res.status(500)
        res.send(error.message)
    }
}

export const getUserNames = async(req, res) =>{

    try{
        const pool= await getConnection()
        const result=await pool.request()
        .query(queries.getUserNames)
        console.log(result)
        res.json(result.recordset)
    }
    catch(error){
        res.status(500)
        res.send(error.message)
    }
}



export const firstRegistry = async(req, res) =>{
    const {username,password,name,email,father,mother,cellphone,age,weight,height,DrID}=req.body

    if((username||password||name||email||father||mother||age||weight||height||DrID||cellphone)=== null){
        return res.status(400).json({msg: "MAL request, llena todo porfa"})
    }
    try{
        console.log(username)
        console.log(email)
        const pool= await getConnection()
        const result=await pool.request()
        .input('username',sql.VarChar,username)
        .input('password',sql.VarChar,password)
        .input('name',sql.VarChar,name)
        .input('email',sql.VarChar,email)
        .input('father',sql.VarChar,father)
        .input('mother',sql.VarChar,mother)
        .input('cellphone',sql.VarChar,cellphone)
        .input('age',sql.Int,age)
        .input('weight',sql.Int,weight)
        .input('height',sql.Int,height)
        .input('DrId',sql.Int,DrID)
        .query(queries.firstRegister)
        console.log(result)
        res.json({username,password,name,email,father,mother,age,weight,height,DrID})
    }
    catch(error){
        res.status(500)
        res.send(error.message)
    }
}