import AppErrors from '@shared/errors/AppError';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';
import { hash, hashSync } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomersService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const EmailExists = await CustomersRepository.findByEmail(email);

    if (EmailExists) {
      throw new AppErrors('Email address already used');
    }
    
    const customer = CustomersRepository.create({
      name,
      email
    });
    await CustomersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomersService;