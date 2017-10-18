'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('app', {
            id: {
                type: Sequelize.INTEGER,
                field: "id",
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                field: "name",
                allowNull: false
            },
            tokenkey: {
                type: Sequelize.STRING,
                allowNull: false
            },
            ovner: {
                type: Sequelize.STRING,
                allowNull: false
            },
            created_at: Sequelize.DATE,
            loggers: Sequelize.ARRAY(Sequelize.STRING)
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('app');
    }
};