import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// import any mocks here and set them as globals
// e.g.
// import _fetch from "./__mocks__/fetch";
// global.fetch = _fetch;

configure({ adapter: new Adapter() });
