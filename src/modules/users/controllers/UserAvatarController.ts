import { Request, Response } from "express"
import UpdateUserAvatarService from "../services/UpdateUserAvatarService"


export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const avatarService = new UpdateUserAvatarService()

    const user = avatarService.execute({
      user_id: request.user.id,
      avatarFileName: request.file?.filename as string
    })

    return response.json(user)

  }
}
