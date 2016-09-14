exports.up = function(knex, Promise) {
  return knex.schema.createTable('restaurants', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('city').notNullable();
    table.string('state').notNullable();
    table.string('cuisine').notNullable();
    table.text('description').notNullable();
    table.string('image_url').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurants');
};
