import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';
import DeleteProfileService from '../services/DeleteProfileService';

export default class ProfileController {

  public async show(request: Request, response: Response): Promise<Response> {
    const  id  = request.user.id;

    const showProfile = new ShowProfileService();
    const profile = await showProfile.execute({ id });

    return response.json(profile);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const  id  = request.user.id;
    const { name, email, new_password, old_password } = request.body;

    const updateProfile = new UpdateProfileService();
    const profile = await updateProfile.execute({
      id,
      name,
      email,
      new_password,
      old_password,
    });

    return response.json(profile);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const  id  = request.user.id;
    const password = request.body.password

    const deleteProfile = new DeleteProfileService();
    const profile = await deleteProfile.execute({ id, password });

    return response.json([]);
  }

}