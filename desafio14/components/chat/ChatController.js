const Message = require('./ChatMongoSchema');

class ChatController {
    constructor(){}

    async listAll(){
        try{
            return await Message.find({});

        }catch(error){
            console.log(error);
            throw new Error(`No se pueden mostrar los mensajes: ${error}`);
        }
    }

    async save(newElement){
        try{
            return await Message.create(newElement);

        }catch(error){
            console.log(error);
            throw new Error(`No se puede guardar el mensaje: ${error}`);
        }
    }

    async listById(id){
        try{
            return await Message.findById(id);

        }catch(error){
            console.log(error);
            throw new Error(`No se puede mostrar el mensaje: ${error}`);
        }
    }
    async update(id, data){
        try{
            return await Message.findByIdAndUpdate(id, data);
        }catch(error){
            console.log(error)
            throw new Error(`No se puede actualizar el mensaje: ${error}`);
        }
    }
    async delete(id){
        try{
            return await Message.findByIdAndDelete(id);
        }catch(error){
            console.log(error);
            throw new Error(`No se puede eliminar el mensaje: ${error}`);
        }
    }

}

const chatController = new ChatController();
module.exports = chatController;
