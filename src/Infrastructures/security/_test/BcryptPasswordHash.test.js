const bcrypt = require('bcrypt');
const BcryptPasswordHash = require('../BcryptPasswordHash');
const AuthenticationError = require('../../../Commons/exceptions/AuthenticationError');
const PasswordHash = require('../../../Applications/security/PasswordHash');

describe('BcryptPasswordHash', () => {
    it('should be instance of EncryptionHelper', () => {
        const bcryptPasswordHash = new BcryptPasswordHash({}); // Dummy bcrypt
    
        expect(bcryptPasswordHash).toBeInstanceOf(PasswordHash);
      });

    describe('hash function', () => {
        it('should encrypt password correctly', async () => {
            // Arrange
            const spyHash = jest.spyOn(bcrypt, 'hash');
            const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

            // Action
            const encryptedPassword = await bcryptPasswordHash.hash('plain_password');

            // Assert
            expect(typeof encryptedPassword).toEqual('string');
            expect(encryptedPassword).not.toEqual('plain_password');
            expect(spyHash).toBeCalledWith('plain_password', 10);
        });
    });

    describe('comparePassword function', () => {
        it('should throw AuthenticationError if password not match', async () => {
            // Arrange
            const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

            // Action & Assert
            await expect(bcryptPasswordHash.comparePassword('plain_password','encrypted_password')).rejects.toThrow(AuthenticationError);
        })

        it('should not return AuthenticationError if password match', async () => {
            // Arrange
            const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);
            const plainPassword = 'secret';
            const encryptedPassword = await bcryptPasswordHash.hash(plainPassword);

            // Action & Assert
            await expect(bcryptPasswordHash.comparePassword(plainPassword,encryptedPassword)).resolves.not.toThrow(AuthenticationError);
        });
    });
});