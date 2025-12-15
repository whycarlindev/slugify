import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('link_accesses', (table) => {
    table.uuid('id').primary()
    table.uuid('link_id').notNullable()
    table.timestamp('accessed_at').notNullable().defaultTo(knex.fn.now())
    table.string('ip_address', 45).notNullable()

    table
      .foreign('link_id')
      .references('id')
      .inTable('links')
      .onDelete('CASCADE')
    table.index('link_id')
    table.index('accessed_at')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('link_accesses')
}
