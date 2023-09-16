const InvariantError = require('../../../Commons/exceptions/InvariantError');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const pool = require('../../database/postgres/pool');
const AuthenticationRepositoryPostgres = require('../AuthenticationRepositoryPostgres');

describe('AuthenticationRepositoryPostgres', () => {
    it('should be instance of AuthenticationRepository domain', () => {
        const authenticationRepositoryPostgres = new AuthenticationRepositoryPostgres();
        expect(authenticationRepositoryPostgres).toBeInstanceOf(AuthenticationRepositoryPostgres);
    });

    describe('behavior test', () => {
        afterEach(async () => {
            await AuthenticationsTableTestHelper.cleanTable();
          });

        afterAll(async () => {
            await pool.end();
        });

        describe('addToken function', () => {
            it('should add token to database', async () => {
                // Arrange
                const authenticationRepositoryPostgres = new AuthenticationRepositoryPostgres(pool);
                const token = 'token';
    
                // Action
                await authenticationRepositoryPostgres.addToken(token);
    
                // Assert
                const tokens = await AuthenticationsTableTestHelper.findToken(token);
                expect(tokens).toHaveLength(1);
                expect(tokens[0].token).toBe(token);
            });
        });
    });
});