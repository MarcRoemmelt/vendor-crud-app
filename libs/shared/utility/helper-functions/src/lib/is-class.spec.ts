import { isClass } from './is-class';

describe('isClass', () => {
    it('should work', () => {
        class Tree {}
        expect(isClass(Tree)).toEqual(true);
        expect(isClass(() => 0)).toEqual(false);
        expect(isClass(2)).toEqual(false);
        expect(isClass('hello')).toEqual(false);
    });
});
