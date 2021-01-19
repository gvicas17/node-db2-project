

exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
      tbl.increments("id")
      tbl.integer("vin").notNullable().unique()
      tbl.text("make").notNullable()
      tbl.text("model").notNullable()
      tbl.integer("miles").notNullable()
      tbl.text("transmission")
      tbl.text("title_status")
  })
};

exports.down = function(knex) {
  return  knex.schema.dropTableIfExists("cars")
};
