import { matchRoles } from './match-roles';

describe('matchRoles', () => {
    it('should work', () => {
        expect(matchRoles(['a', 'b'], 'a')).toEqual(true);
        expect(matchRoles(['a', 'b'], 'c', 'c')).toEqual(true);
        expect(matchRoles(['a', 'b'], 'c')).toEqual(false);
    });
});
