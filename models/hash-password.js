const bcrypt = require('bcrypt');
const saltRounds = 10; 

module.exports = {
    async hashPassword(passwordToHash) {
        return await bcrypt.hash(passwordToHash, saltRounds);
    },
    async matchPassword(userPassword, hash) {
        const match = await bcrypt.compare(userPassword, hash);
        return match;
    }
}

/*
getPass()
async function getPass() {
const myPlaintextPassword = 'staff123';
console.log(myPlaintextPassword);
const hash = await hashPassword(myPlaintextPassword);
console.log('Hash: ', hash);
const match = await matchPassword(myPlaintextPassword, hash);
console.log('Password match: ', match);
}
*/