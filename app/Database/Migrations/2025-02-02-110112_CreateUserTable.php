<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateUserTable extends Migration
{
    private const USERS_TABLENAME = 'users';

    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 11,
                'null' => false,
                'auto_increment' => true
            ],
            'first_name' => [
                'type' => 'VARCHAR',
                'constraint' => 32,
                'null' => false
            ],
            'last_name' => [
                'type' => 'VARCHAR',
                'constraint' => 32,
                'null' => false,
            ],
            'email' => [
                'type' => 'VARCHAR',
                'constraint' => 128,
                'null' => false,
            ],
            'birthdate' => [
                'type' => 'DATE',
                'null' => false
            ]
        ]);

        $this->forge->addPrimaryKey('id');
        $this->forge->createTable(self::USERS_TABLENAME);
    }

    public function down()
    {
        if ($this->db->table(self::USERS_TABLENAME)->countAllResults() > 0) return;

        $this->forge->dropTable(self::USERS_TABLENAME);
    }
}
