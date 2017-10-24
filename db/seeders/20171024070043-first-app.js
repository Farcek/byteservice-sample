'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('app', [{
            id: 1,
            name: 'sampleapp',
            tokenkey: '123456789',
            owner: '',
            created_at: new Date()

        }], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('app', null, {});

    }
};