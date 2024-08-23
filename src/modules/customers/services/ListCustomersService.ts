import Customer from "../typeorm/entities/Customer";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";

class ListCustomersService{
  public async excute(): Promise<Customer[]>{
    const customersList = CustomersRepository.find()

    return customersList
  }
}
