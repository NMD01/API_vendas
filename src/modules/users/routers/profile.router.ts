import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import ProfileController from '../controllers/ProfilesController';


const userRouter = Router();
const profileController = new ProfileController()


userRouter.get('/', isAuthenticated, profileController.show);

userRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      new_password: Joi.string(),
      new_password_confirm: Joi.string().valid(Joi.ref('new_password')).when('new_password', {
        is: Joi.exist(), // Se new_password existe
        then: Joi.required(), // new_password_confirm é obrigatório
      }),
      old_password: Joi.string().required(),
    },
  }),
  isAuthenticated,
  profileController.update,
);



userRouter.delete('/', isAuthenticated, celebrate({
  [Segments.BODY]:{
    password: Joi.string().required()
  }
}),profileController.delete);

export default userRouter;