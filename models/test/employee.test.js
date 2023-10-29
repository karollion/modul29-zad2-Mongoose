const Employee = require('../employe.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

  it('should throw an error if no any arg', async () => {
    const emp = new Employee({}); // create new Employee, but don't set any attr value

    emp.validateSync(err => {
      expect(err.errors.name).to.exist;
    });
  });

  it('should throw an error if no "firstName" arg', () => {
    const cases = [
      { firstName: 'John', lastName: 'Doe', department: 'IT', salary: '3000'}
    ];

    for(let cas of cases) {
      const emp = new Employee({ cas });
      emp.validateSync(err => {
        expect(err).to.exist;
      });
    }
  });

  it('should throw an error if no "lastName" arg', () => {
    const cases = [
      { firstName: 'John', department: 'IT', salary: '3000'}
    ];

    for(let cas of cases) {
      const emp = new Employee({ cas });
      emp.validateSync(err => {
        expect(err).to.exist;
      });
    }
  });

  it('should throw an error if no "department" arg', () => {
    const cases = [
      { firstName: 'John', lastName: 'Doe', salary: '3000'}
    ];

    for(let cas of cases) {
      const emp = new Employee({ cas });
      emp.validateSync(err => {
        expect(err).to.exist;
      });
    }
  });

  it('should throw an error if no "salary" arg', () => {
    const cases = [
      { firstName: 'John', lastName: 'Doe', department: 'IT' }
    ];

    for(let cas of cases) {
      const emp = new Employee({ cas });
      emp.validateSync(err => {
        expect(err).to.exist;
      });
    }
  });

  it('should throw an error if "firstName" is not a string', () => {
    const cases = [
      { firstName: {}, lastName: 'Doe', department: 'IT', salary: '3000'},
      { firstName: [], lastName: 'Sip', department: 'HR', salary: '5500' },
    ];

    for(let cas of cases) {
      const emp = new Employee({ cas });
      emp.validateSync(err => {
        expect(err).to.exist;
      });
    }
  });

  it('should throw an error if "lastName" is not a string', () => {
    const cases = [
      { firstName: 'John', lastName: {}, department: 'IT', salary: '3000'},
      { firstName: 'Amanda', lastName: [], department: 'HR', salary: '5500' },
    ];

    for(let cas of cases) {
      const emp = new Employee({ cas });
      emp.validateSync(err => {
        expect(err).to.exist;
      });
    }
  });

  it('should throw an error if "department" is not a string', () => {
    const cases = [
      { firstName: 'John', lastName: 'Doe', department: {}, salary: '3000'},
      { firstName: 'Amanda', lastName: 'Sip', department: [], salary: '5500' },
    ];

    for(let cas of cases) {
      const emp = new Employee({ cas });
      emp.validateSync(err => {
        expect(err).to.exist;
      });
    }
  });

  it('should throw an error if "salary" is not a number', () => {
    const cases = [
      { firstName: 'John', lastName: 'Doe', department: 'IT', salary: {}},
      { firstName: 'Amanda', lastName: 'Sip', department: 'HR', salary: [] },
    ];

    for(let cas of cases) {
      const emp = new Employee({ cas });
      emp.validateSync(err => {
        expect(err).to.exist;
      });
    }
  });

  it('should not throw an error if "firstName", "lastName", "department", "salary" is okay', () => {
    const cases = [
      { firstName: 'John', lastName: 'Doe', department: 'IT', salary: '3000'},
      { firstName: 'Amanda', lastName: 'Sip', department: 'HR', salary: '5500' },
      { firstName: 'Noe', lastName: 'Doe', department: 'Cleaning', salary: '3000'},
    ];

    for(let cas of cases) {
      const emp = new Employee({ cas });
      emp.validateSync(err => {
        expect(err).to.not.exist;
      });
    }
  });

  after(() => {
    mongoose.models = {};
  });
}); 
