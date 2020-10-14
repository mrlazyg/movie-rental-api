const Customer = require('../dao/models/Customer');

class CustomerService {
  static async getAllCustomer() {
    const customers = await Customer.find();
    return customers;
  }

  static async getCustomer(id) {
    try {
      const customer = await Customer.findById(id);
      if (!customer) return 'The customer with the given Id was not found';
      return customer;
    } catch (error) {
      console.error('Get Customer by Id :', error.message);
      return 'Please provide the id in valid format';
    }
  }

  static async createCustomer(body) {
    try {
      let customer = new Customer(body);
      customer = await customer.save();
      return customer;
    } catch (error) {
      console.error('Create Customer :', error.message);
      return 'Exception in creating customer';
    }
  }

  static async updateCustomer(id, body) {
    try {
      const customer = await Customer.findByIdAndUpdate(id, body, { new: true });
      if (!customer) return 'The customer with the given ID was not found';
      return customer;
    } catch (error) {
      console.error('Update Customer :', error.message);
      return 'Exception in updating customer';
    }
  }

  static async deleteCustomer(id) {
    try {
      const customer = await Customer.findByIdAndRemove(id);
      if (!customer) return 'The customer with the given ID was not found';
      return customer;
    } catch (error) {
      console.error('Delete Customer :', error.message);
      return 'Exception in deleting customer';
    }
  }
}

module.exports = CustomerService;
