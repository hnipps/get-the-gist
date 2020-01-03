/* eslint-disable */
require("isomorphic-fetch");
const enzyme = require("enzyme");
const enzymePreact = require("enzyme-adapter-preact-pure");

enzyme.configure({ adapter: new enzymePreact.Adapter() });

global.fetch = jest.fn();
