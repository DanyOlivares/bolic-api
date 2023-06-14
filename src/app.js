const express= require ('express')
import config from './config'
const passport = require ('passport')
const cookieParser = require('cookie-parser')
const session = require ('express-session')
const PassportLocal = require ('passport-local')
import DoctoresRoutes from './routes/Doctores.routes'

import{getConnection,sql,queries} from './database'

const app= express()


//Logeo necesarios
app.use(cookieParser('my secret'))
app.use(
    session({
    secret: 'my secret',
    resave: true,
    saveUninitialized: true
})
);

app.use(passport.initialize());
app.use(passport.session());

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(DoctoresRoutes)



const getUsuarios = async(req, res) => {
    try{
        const pool= await getConnection();
        const result= await pool.request().query(queries.getAllDoctors);
        return result.recordset
    }
    catch(error){
        res.status(500)
        res.send(error.message)
    }
};

const getPatient = async(data) => {
  try{
      const pool= await getConnection();
      const result= await pool.request().input("ID",sql.Int,data).query(queries.getInfPaci);
      return result.recordset
  }
  catch(error){
      res.status(500)
      res.send(error.message)
  }
};




passport.use(new PassportLocal(async function (username, password, done) {
    try {
      const usuarios = await getUsuarios(); // Obtener los usuarios usando await
       
      for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].username === username) {
            if ((usuarios[i].contraseña)===password){
              const pacientes = await getPatient(usuarios[i].ID);
                
              const mappedData = {
                doctorID: usuarios[i].ID,
                content : pacientes
              }
              console.log(JSON.stringify(mappedData))
                return done(null, mappedData);
            }
        }
      }
      done(null, false);
    } catch (error) {
      done(error);
    }
  }));
  


// Assuming you have a data source or API to retrieve doctors
async function getDoctorById(id) {
  try {
    // Make a request to the data source or API to get the doctor by ID
    const response = await fetch(`http://localhost:3000/Doctores/${id}`);
    const doctor = await response.json();

    return doctor; // Return the doctor object
  } catch (error) {
    throw new Error("Failed to get doctor by ID");
  }
}

  passport.serializeUser(function(user, done) {
    if (user.doctorID) {
      done(null, user.doctorID);
    } else {
      done(new Error("Doctor ID not found"));
    }
  });
  
  passport.deserializeUser(async function(id, done) {
    try {
      // Assuming you have a function called getDoctorById to retrieve the doctor object
      const doctor = await getDoctorById(id);
      const pacientes = await getPatient(id);
      if (doctor) {
        done(null, pacientes);
      } else {
        // Error: Doctor not found
        const error = new Error("Doctor not found");
        error.status = 404;
        done(error);
      }
    } catch (error) {
      done(error);
    }
  });
  

app.set('port', config.port)
export default app