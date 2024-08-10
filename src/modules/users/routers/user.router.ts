import { Router } from "express";
import { celebrate, Joi, Segments} from "celebrate";
import UsersController from "../controllers/usersController";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";

const userRouter = Router()
const usersController = new UsersController()

userRouter.get("/", isAuthenticated, usersController.index)
userRouter.get("/:id",
  celebrate({
    [Segments.PARAMS]:{
      id: Joi.string().uuid().required()
    }
  })
  , isAuthenticated,usersController.show)


  userRouter.post("/", celebrate({
    [Segments.BODY]:{
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required()
    }
  }), usersController.create)


userRouter.put("/:id", celebrate({
  [Segments.PARAMS]:{
    id: Joi.string().uuid().required()
  },

  [Segments.BODY]:{
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string()
  }
}), isAuthenticated, usersController.update)


userRouter.delete("/:id", celebrate({
  [Segments.PARAMS]:{
    id: Joi.string().uuid().required()
  }
}), usersController.delete)


export default userRouter