import {Router} from 'express'
import {actDoctorbyId, actProductbyId, addDoctor, deleteDoctorbyId, getDoctorbyID, getDoctores,getProductbyId, getTotalDoctors,addusername,firstRegistry,getUserNames,addMedicamento, getMedicamento, addTiempos, mainPage, mainPage2, login, authenticatione, acceso, index, indexcss, doctorcss, gamecss, logincss, registrocss, registro, game, showImageH, showImageN, track} from '../controllers/Doctores.controller'


const router= Router()

//rutas para estilos

router.get('/index.css',indexcss)

router.get('/doctor.css',doctorcss)

router.get('/game.css',gamecss)

router.get('/login.css',logincss)

router.get('/registro.css',registrocss)

//Algunas rutas a html

router.get('/game.html',game)

router.get('/registro.html',registro)

//
router.get('/',index)

router.get('/logger',mainPage,mainPage2)

router.get('/login',login)

router.post('/login',authenticatione)

router.get('/Doctores',getDoctores)

router.get('/acceso',acceso)


router.post('/userprueba',addusername)

router.get('/userprueba',getUserNames)

router.post('/tiempos',addTiempos)

router.post('/firstRegistry',firstRegistry)

router.post('/Doctores', addDoctor)

router.get('/Doctores/count',getTotalDoctors)

router.get('/Doctores/:id',getDoctorbyID)

router.delete('/Doctores/:id',deleteDoctorbyId)

router.put('/Doctores/:id',actDoctorbyId)

router.post('/Medicamento',addMedicamento)

router.get('/Medicamento',getMedicamento)

//Rutas de imagen

router.get('/bolicH', showImageH)

router.get('/bolicN',showImageN)

//Rutas de audio

router.get('/audio',track)

export default router