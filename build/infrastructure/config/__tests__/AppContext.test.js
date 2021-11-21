"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppContext_1 = require("../AppContext");
describe("AppContext", () => {
    test("When AppContext is assigned, then it should create an instance", () => {
        expect(new AppContext_1.AppContext()).toBeTruthy();
    });
});
