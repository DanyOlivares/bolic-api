import sql from 'mssql'

const dbSettings={
    user: "wellmind",
    password:"password",
    server:"localhost",
    database: "Bolic",
    options:{
        encrypt: true,
        trustServerCertificate: true,
    },
};

export async function getConnection(){
    try{
        const pool =await sql.connect(dbSettings)
        return pool
    }
    catch(error){
        console.error(error)
    }

}
export {sql}
