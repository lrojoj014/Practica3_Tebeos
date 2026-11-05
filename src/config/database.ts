import { Db, MongoClient } from 'mongodb';

const client = new MongoClient("mongodb+srv://lrojoj014_db_user:LrojojMoguito014@cluster0.vsvqs2l.mongodb.net/");

export const connectMongo = ():Promise<Db> => {

    return client.connect().then(()=>{
        console.log("Conectado al Monguito");

        return client.db("BaseDeDatos")
    }).catch((error)=>{
        console.log("Error al conectar con Mongo");
        throw error;
    })
}