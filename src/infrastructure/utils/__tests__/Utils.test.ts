import { randomId } from '../Utils'

describe('Random ID', () => {
    it('should return a string', () => {
        expect(typeof randomId()).toBe('string');
    });

    it('should return a string with length 36', () => {
        expect(randomId().length).toBe(36);
    });
});
