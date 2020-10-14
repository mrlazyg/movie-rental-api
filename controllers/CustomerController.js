const CustomerService = require('../services/CustomerService');

class CustomerController {
  static async getAllCustomer(req, res) {
    const customers = await CustomerService.getAllCustomer();
    res.send(customers);
  }

  static async getCustomer(req, res) {
    if (req.params.id) {
      const customer = await CustomerService.getCustomer(req.params.id);
      return res.send(customer);
    }
    res.status(400).send('Please provide the customer Id');
  }

  static async createCustomer(req, res) {
    const { name, phone } = req.body;
    if (name && phone) {
      const customer = await CustomerService.createCustomer(req.body);
      return res.send(customer);
    }
    res.status(400).send('Please provide required params');
  }

  static async updateCustomer(req, res) {
    if (req.params.id && req.body) {
      const customer = await CustomerService.updateCustomer(req.params.id, req.body);
      return res.send(customer);
    }
    res.status(400).send('Please provide the required params');
  }

  static async deleteCustomer(req, res) {
    if (req.params.id) {
      const customer = await CustomerService.deleteCustomer(req.params.id);
      return res.send(customer);
    }
    res.status(400).send('Please provide the customer id');
  }
}

module.exports = CustomerController;
