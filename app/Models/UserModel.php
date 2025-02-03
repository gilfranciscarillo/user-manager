<?php

namespace App\Models;

use CodeIgniter\Model;
use App\Entities\UserEntity;

class UserModel extends Model
{
    protected $table            = 'users';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = UserEntity::class;
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['first_name', 'last_name', 'email', 'birthdate'];

    protected bool $allowEmptyInserts = false;
    protected bool $updateOnlyChanged = true;

    protected array $casts = [];
    protected array $castHandlers = [];

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = [
        'first_name' => 'required|max_length[32]',
        'last_name' => 'required|max_length[32]',
        'email' => 'required|valid_email',
        'birthdate' => 'required|valid_date[Y-m-d]'
    ];

    protected $validationMessages   = [
        'first_name' => [
            'required' => 'First name is required',
            'max_length' => 'First name cannot exceed the maximum characters of {param}'
        ],
        'last_name' => [
            'required' => 'First name is required',
            'max_length' => 'First name cannot exceed the maximum characters of {param}'
        ],
        'email' => [
            'required' => 'Email is required',
            'valid_email' => 'Invalid Email'
        ],
        'birthdate' => [
            'required' => 'Birthdate is required',
        ]
    ];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = [];
    protected $afterInsert    = [];
    protected $beforeUpdate   = [];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = [];
    protected $afterDelete    = [];
}
