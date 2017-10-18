## Migration

The Sequelize Command Line Interface (CLI)


project migration commands

``` javascript
// Generates a new migration file
npm run db:gen -- --name=[migration file name]

// Run pending migrations
npm run db:up

// Reverts a migration
npm run db:down
```

Use  other commands
```
node_modules/.bin/sequelize [command] <arguments>
```