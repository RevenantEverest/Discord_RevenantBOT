const db = require('../config/connection');

module.exports = {
    findAll() {
        return db.many('SELECT * FROM command_logs ORDER BY id DESC');
    },
    findById(id) {
        return db.one('SELECT * FROM command_logs WHERE id = $1', id);
    },
    findByGuildId(id) {
        return db.many('SELECT * FROM command_logs WHERE guild_id = $1 ORDER BY id DESC', id);
    },
    findByCommand(command) {
        return db.many('SELECT * FROM command_logs WHERE command = $1 ORDER BY id DESC', command);
    }
};