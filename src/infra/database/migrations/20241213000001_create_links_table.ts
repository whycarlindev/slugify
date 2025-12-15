import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('links', (table) => {
    table.uuid('id').primary()
    table.string('slug', 255).notNullable().unique()
    table.text('original_url').notNullable()
    table.timestamp('expiration_date').notNullable()
    table.integer('click_count').notNullable().defaultTo(0)
    table.boolean('is_active').notNullable().defaultTo(true)
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').nullable()

    table.index('slug')
    table.index('is_active')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('links')
}
