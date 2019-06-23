const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');
const fetchPolifill = require('whatwg-fetch')

global.fetch = fetchPolifill.fetch
global.Request = fetchPolifill.Request
global.Headers = fetchPolifill.Headers
global.Response = fetchPolifill.Response

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });