
const { Pool } = require('pg')

class Database {

    /**
     * @param instance object
     * 
     */

    constructor() {
        this.instance = this.createPool();
    }

    getInstance() {
        return this.instance;
    }

    createPool() {
        return new Pool({
            user: 'dev',
            host: 'localhost',
            database: 'journal',
            password: 'Qwerty@321',
            port: 5432,
        })
    }
}

module.exports = Database;