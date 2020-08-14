import knex from 'knex';

export async function up(knex: knex){
    return knex.schema.createTable('users', table=>{
        table.increments('id').primary();
        table.string('primeiroNome').notNullable();
        table.string('ultimoNome').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bibliografia').notNullable();

    });
}

//somucua5@gmail.com
//Assunto: AutoColante de vinil - Quantidade Obs: AP - 50 
//
export async function down(knex: knex){
    return knex.schema.dropTable('users');
}