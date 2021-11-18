"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("../Utils");
describe('Random ID', () => {
    it('should return a string', () => {
        expect(typeof (0, Utils_1.randomId)()).toBe('string');
    });
    it('should return a string with length 36', () => {
        expect((0, Utils_1.randomId)().length).toBe(36);
    });
});
