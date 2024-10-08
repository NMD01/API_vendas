import AppErrors from '@shared/errors/AppError';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customer = await CustomersRepository.findById(id);

    if (!customer) {
      throw new AppErrors('Customer not found!');
    }

    await CustomersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
