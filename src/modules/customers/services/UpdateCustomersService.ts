import AppErrors from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({
    id,
    name,
    email
  }: IRequest): Promise<Customer> {
    const customer = await CustomersRepository.findById(id);
    const emailExists = await CustomersRepository.findByEmail(email);

    if (!customer) {
      throw new AppErrors('Customer not found!');
    }


    if (email) {
      if (emailExists && emailExists.id != customer.id) {
        throw new AppErrors('Email address already used');
      }
      customer.email = email;
    }


    customer.name = name;

    await CustomersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;