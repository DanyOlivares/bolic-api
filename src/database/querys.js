export const queries= {
    getAllDoctors: "SELECT * FROM Doctor",
    insDoctors: "INSERT INTO Doctor (correo,username,contraseña) VALUES (@correo,@username,@contraseña)",
    getbyId: "select * from Doctor where ID=@ID",
    deleteDoctorsId: "delete from Doctor where ID =@ID",
    getTotalDoctors: "Select count(*) from Doctor",
    updateDoctorbyId: "UPDATE Doctor set correo=@correo, username=@username, contraseña=@contraseña where ID =@ID",
    //queries que se usaran ya
    addUserpr:"INSERT INTO prueba (username) values (@username)",
    getUserNames: "select * from prueba",
    firstRegister: "insert into paciente (correo,username,contraseña,nombre,apellidoP, apellidoM,telefono,edad,peso,altura,drID) values (@email,@username,@password,@name,@father, @mother,@cellphone, @age, @weight, @height, @DrId)",
    addMedicine: "insert into Medicamento (tipo) values (@tipo)",
    getMedicine: "select * from Medicamento",
    insTimes: "insert into tiempos (fecha,hora) values (@fecha,@hora)",
    getInfPaci: "EXEC ObtenerInformacionPacientes @doctorID = @ID"
    
    

}