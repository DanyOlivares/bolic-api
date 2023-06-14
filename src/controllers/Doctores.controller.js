import{getConnection,sql,queries} from '../database'
const passport = require ('passport')
const path = require ("path")
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
        res.redirect("/acceso?username=" + encodeURIComponent(JSON.stringify({correo,username,contraseña})));
    }
    catch{
        res.status(500)
        res.send(error.message)
    }
}

export const addTiempos= async(req, res)=>{
    try{
        const fechaActual = new Date();
        const horaActual = fechaActual.toLocaleTimeString();
        console.log(horaActual)
    const pool=await getConnection()
    const resulte=await pool.request()
    .input("fecha",sql.Date,fechaActual)
    .input("hora",sql.VarChar,horaActual)
    .query(queries.insTimes)
    res.json({fechaActual,horaActual})
    }
    catch(error){
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

export const addMedicamento = async(req, res) =>{
    const {medicine}=req.body
    if (medicine ==null){
        return res.status(400).json({msg: "MAL request, llena todo porfa"})
    }
    try{
        const pool= await getConnection()
        const result=await pool.request().input('tipo',sql.VarChar,medicine)
        .query(queries.addMedicine)
        
        res.json({medicine})
    }
    catch(error){
        res.status(500)
        res.send(error.message)
    }
}

export const getMedicamento = async(req, res) =>{
    try{
        const pool= await getConnection()
        const result=await pool.request()
        .query(queries.getMedicine)
        
        res.json(result.recordset)
    }
    catch(error){
        res.status(500)
        res.send(error.message)
    }
}


export const mainPage = (req,res, next)=>{
    if(req.isAuthenticated()) return next();
        
    res.redirect("/login");

}

export const mainPage2 = (req, res) =>{
    
    const all= req.user;

        // Send the username and password in the response
        //res.send(`Welcome! Username: ${JSON.stringify(all)}`);
        res.redirect("/acceso?username=" + encodeURIComponent(JSON.stringify(all)));
}

export const authenticatione = passport.authenticate('local',{
    
    successRedirect: "/logger",
    failureRedirect: "/login"
})

//Rutas de html

export const acceso = (req, res)=>{
    res.sendFile('doctor.html', { root: './src/public' });
}

export const login = (req, res)=>{
    res.sendFile('login.html', { root: './src/public' });
}

export const index = (req, res)=>{
    res.sendFile('index.html', { root: './src/public' });
}

export const game = (req, res)=>{
    res.sendFile('game.html', { root: './src/public' });
}

export const registro = (req, res)=>{
    res.sendFile('registro.html', { root: './src/public' });
}

//css
export const indexcss= (req, res)=>{
    res.sendFile('index.css', { root: './src/public' });
}

export const doctorcss= (req, res)=>{
    res.sendFile('doctor.css', { root: './src/public' });
}

export const gamecss= (req, res)=>{
    res.sendFile('game.css', { root: './src/public' });
}

export const logincss= (req, res)=>{
    res.sendFile('login.css', { root: './src/public' });
}

export const registrocss= (req, res)=>{
    res.sendFile('registro.css', { root: './src/public' });
}

//Imagenes

export const showImageH = (req, res) => {
    res.sendFile('bolic_head.png', { root: './src/public/images' });
};

export const showImageN = (req, res) => {
    res.sendFile('bolic_normal.png', { root: './src/public/images' });
};

export const track = (req, res) => {
    res.sendFile('audiomp3.mp3', { root: './src/public/audio' });
};
  