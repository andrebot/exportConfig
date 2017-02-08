'use strict';

const should = require('chai').should();

const exportConfig = require('../index');
const dummyConfig = {
  default: {
    opa: 1,
    aha: 2
  },
  development: {
    opa: 3,
    lala: 5
  },
  production: {
    opa: 6
  },
  required: ['opa']
};

describe('Export Configuration', function () {
  it('should overwrite default values with the environment object\'s variables', function () {
    const newConfig = exportConfig(dummyConfig);

    dummyConfig.default.opa.should.not.be.equals(dummyConfig.development.opa);
    newConfig.opa.should.be.equals(dummyConfig.development.opa);
    newConfig.opa.should.not.be.equals(dummyConfig.default.opa);
  });

  it('should be able to choose the correct environment with the process.env.NODE_ENV variable', function () {
    let newConfig = exportConfig(dummyConfig);

    newConfig.opa.should.be.equals(dummyConfig.development.opa);
    newConfig.lala.should.be.equals(dummyConfig.development.lala);
    newConfig.aha.should.be.equals(dummyConfig.default.aha);

    process.env.NODE_ENV = 'production';

    newConfig = exportConfig(dummyConfig);

    newConfig.opa.should.be.equals(dummyConfig.production.opa);
    newConfig.aha.should.be.equals(dummyConfig.default.aha);

    process.env.NODE_ENV = '';
  });

  it('should throw an error if there is an required attribute missing', function () {
    const copyCnfg = Object.assign({}, dummyConfig);

    delete copyCnfg.default.opa;
    delete copyCnfg.development.opa;

    (function () {exportConfig(copyCnfg)}).should.throw(Error);
  });
});
