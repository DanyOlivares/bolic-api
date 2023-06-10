import {Router} from 'express'
import {actDoctorbyId, actProductbyId, addDoctor, deleteDoctorbyId, getDoctorbyID, getDoctores,getProductbyId, getTotalDoctors,addusername,firstRegistry,getUserNames} from '../controllers/Doctores.controller'


const router= Router()

router.get('/Doctores',getDoctores)

router.post('/userprueba',addusername)

router.get('/userprueba',getUserNames)

router.post('/firstRegistry',firstRegistry)

router.post('/Doctores', addDoctor)

router.get('/Doctores/count',getTotalDoctors)

router.get('/Doctores/:id',getDoctorbyID)

router.delete('/Doctores/:id',deleteDoctorbyId)

router.put('/Doctores/:id',actDoctorbyId)



export default router