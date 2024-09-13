import {Knex} from 'knex';

exports.up = async function(knex:Knex,) {
  await knex.schema.createTable('unit_tests', function(tb) {
   tb.increments('unit_test_id');
   tb.string('unit_test_name').notNullable().unique();
   tb.specificType('owners', 'text[]');
  });

  await knex.schema.createTable('unit_test_details', function(tb) {
   tb.integer('unit_test_id');
   tb.string('build_mode').notNullable();
   tb.enu('unit_test_type', ['STABLE', 'TENTATIVELY FIXED', 'QUARANTINE', 'FORCED QUARANTINE'], {
    useNative: true,
    enumName: 'unit_test_type'
   });
   tb.integer('rpd');
   tb.integer('changelist');
   tb.foreign('unit_test_id').references('unit_tests.unit_test_id').onDelete('CASCADE');
   tb.unique(['unit_test_id', 'build_mode'], 'unit_test_details_unique');
  })

  await knex.schema.createTable('unit_test_runs', function(tb) {
   tb.increments('id');
   tb.integer('unit_test_id').notNullable();
   tb.string('build_mode').notNullable();
   tb.decimal('running_time');
   tb.integer('failed').notNullable();
   tb.string('test_site');
   tb.timestamp('time_stamp').defaultTo(knex.fn.now());
   tb.foreign('unit_test_id').references('unit_tests.unit_test_id').onDelete('CASCADE');
  });

  await knex.schema.createTable('type_transitions', function(tb) {
   tb.increments('id');
   tb.integer('unit_test_id').notNullable();
   tb.integer('rpd');
   tb.string('from').notNullable();
   tb.string('to').notNullable();
   tb.specificType('description', 'text').notNullable();
   tb.integer('changelist');
   tb.string('transitioned_by');
   tb.foreign('unit_test_id').references('unit_tests.unit_test_id').onDelete('CASCADE');
  });

 };

exports.down = async function(knex:Knex,) {
  await knex.schema.dropTable('unit_test_details');
  await knex.schema.dropTable('unit_test_runs');
  await knex.schema.dropTable('type_transitions');
  await knex.schema.dropTable('unit_tests');
};











