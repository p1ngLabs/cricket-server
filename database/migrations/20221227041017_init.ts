import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable('users', (table) => {
      table.increments().primary({ constraintName: 'users.primary_key' });
      table.string('firstName', 50);
      table.string('lastName', 50);
      table.string('username').notNullable().index();
      table.string('email').unique().notNullable().index();
      table.string('password');
      table.string('phone');
      table.string('avatar');
      table.enu('gender', ['female', 'male', 'other']);
      table
        .enu('role', ['admin', 'moderator', 'customer'])
        .defaultTo('customer');
      table.boolean('active');
      table.timestamps(true, true);
    })
    .createTable('social_profiles', (table) => {
      table
        .increments()
        .primary({ constraintName: 'social_profiles.primary_key' });
      table
        .integer('userId')
        .unsigned()
        .references('users.id')
        .onUpdate('cascade')
        .onDelete('cascade');
      table.string('provider').index();
      table.string('username');
      table.string('avatar');
      table.timestamps(true, true);
    })
    .createTable('orders', (table) => {
      table.increments().primary({ constraintName: 'orders.primary_key' });
      table
        .integer('userId')
        .unsigned()
        .references('users.id')
        .onUpdate('cascade');
      table.string('paymentMethod');
      table.enu('paymentStatus', ['paid', 'unpaid']);
      table.string('shippingType');
      table.json('shippingAddress');
      table.smallint('quantity');
      table.integer('total');
      table.integer('shippingCost');
      table.integer('grandTotal');
      table.boolean('isCart');
      table.timestamps(true, true);
    })
    .createTable('authors', (table) => {
      table.increments().primary({ constraintName: 'authors.primary_key' });
      table.string('name').unique().notNullable().index();
      table.text('description');
      table.string('slug');
      table.timestamps(true, true);
    })
    .createTable('categories', (table) => {
      table.increments().primary({ constraintName: 'categories.primary_key' });
      table.integer('parentId').unsigned();
      table.string('name').unique().notNullable().index();
      table.string('slug');
      table.boolean('active');
      table.timestamps(true, true);
    })
    .createTable('books', (table) => {
      table.increments().primary({ constraintName: 'books.primary_key' });
      table
        .integer('categoryId')
        .unsigned()
        .references('categories.id')
        .onUpdate('cascade');
      table
        .integer('authorId')
        .unsigned()
        .references('authors.id')
        .onUpdate('cascade');
      table.string('title').notNullable().index();
      table.text('description');
      table.string('publisher').index();
      table.string('publishedDate');
      table.integer('pages');
      table.string('dimensions');
      table.string('language');
      table.string('isbn', 13).index();
      table.enu('condition', ['new', 'used']).index();
      table.integer('price').index();
      table.smallint('currentStock');
      table.integer('soldCopies');
      table.string('thumbnail').notNullable();
      table.string('photos');
      table.string('slug');
      table.boolean('active');
      table.timestamps(true, true);
    })
    .createTable('orders_books', (table) => {
      table
        .integer('orderId')
        .unsigned()
        .references('orders.id')
        .onUpdate('cascade');
      table
        .integer('bookId')
        .unsigned()
        .references('books.id')
        .onUpdate('cascade');
      table.timestamps(true, true);
    })
    .createTable('books_authors', (table) => {
      table
        .integer('bookId')
        .unsigned()
        .references('books.id')
        .onUpdate('cascade');
      table
        .integer('authorId')
        .unsigned()
        .references('authors.id')
        .onUpdate('cascade');
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  await Promise.all([
    knex.schema.table('social_profiles', (table) => {
      table.dropForeign('userId');
    }),
    knex.schema.table('orders', (table) => {
      table.dropForeign('userId');
    }),
    knex.schema.table('books', (table) => {
      table.dropForeign('categoryId');
      table.dropForeign('authorId');
    }),
    knex.schema.table('orders_books', (table) => {
      table.dropForeign('orderId');
      table.dropForeign('bookId');
    }),
    knex.schema.table('books_authors', (table) => {
      table.dropForeign('bookId');
      table.dropForeign('authorId');
    }),
  ]);
  await knex.schema
    .dropTable('users')
    .dropTable('social_profiles')
    .dropTable('orders')
    .dropTable('authors')
    .dropTable('categories')
    .dropTable('books')
    .dropTable('orders_books')
    .dropTable('books_authors');
}
