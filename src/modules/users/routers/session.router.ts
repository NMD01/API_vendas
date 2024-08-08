import { Router } from "express";
import { celebrate, Joi, Segments} from "celebrate";
import SessionsController from "../controllers/SessionController";


const SessionsRouter = Router()
const SessionController = new SessionsController()



SessionsRouter.post("/", celebrate({
    [Segments.BODY]:{
      email: Joi.string().required().email(),
      password: Joi.string().required()
    }
  }), SessionController.create)


  export default SessionsRouter




