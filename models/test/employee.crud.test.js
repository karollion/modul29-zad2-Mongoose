const Employee = require('../employe.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee - crud', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://0.0.0.0:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {

    //Adding sample data to the test database
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT', salary: '3000' });
      await testEmpOne.save();
    
      const testEmpTwo = new Employee({  firstName: 'Amanda', lastName: 'Bang', department: 'HR', salary: '6500' });
      await testEmpTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "name" with "findOne" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Amanda' });
      const expectedName = 'Amanda';
      expect(employee.firstName).to.be.equal(expectedName);
    });

    // Remove all sample data 
    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({ firstName: 'Amanda', lastName: 'Bang', department: 'HR', salary: '6500' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    // Remove all sample data 
    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Updating data', () => {

    //Adding sample data to the test database. Sample data will be uploaded to the database after each test
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT', salary: '3000' });
      await testEmpOne.save();
    
      const testEmpTwo = new Employee({  firstName: 'Amanda', lastName: 'Bang', department: 'HR', salary: '6500' });
      await testEmpTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne(
        { firstName: 'Amanda', lastName: 'Bang', department: 'HR', salary: '6500' }, 
        { $set: { firstName: 'Lara', lastName: 'Bang', department: 'HR', salary: '6500' }});
      const updatedEmployee = await Employee.findOne({ firstName: 'Lara' });
      expect(updatedEmployee).to.not.be.null;

      afterEach(async () => {
        await Employee.deleteMany();
      });
    });
  
    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Amanda' });
      employee.firstName = 'Lara';
      await employee.save();

      const updatedEmployee = await Employee.findOne({ firstName: 'Lara' });
      expect(updatedEmployee).to.not.be.null;
  
      afterEach(async () => {
        await Employee.deleteMany();
      });
    });
  
    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Updated!' }});
      const employees = await Employee.find({ firstName: 'Updated!' });
      expect(employees.length).to.be.equal(2);
  
      afterEach(async () => {
        await Employee.deleteMany();
      });
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT', salary: '3000' });
      await testEmpOne.save();
    
      const testEmpTwo = new Employee({  firstName: 'Amanda', lastName: 'Bang', department: 'HR', salary: '6500' });
      await testEmpTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'John' });
      const removeEmployee = await Employee.findOne({ firstName: 'John' });
      expect(removeEmployee).to.be.null;

      afterEach(async () => {
        await Employee.deleteMany();
      });
    });
  
    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employee = await Employee.find();
      expect(employee.length).to.be.equal(0);
  
      afterEach(async () => {
        await Employee.deleteMany();
      });
    });
  });

});