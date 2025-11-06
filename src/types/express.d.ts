import {User} from "./user.types"

//attaching a user's information to the request
declare global{
    namespace Express{
        export interface Request{
            user?:User;
        }
    }
}

