<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;
use App\Entities\UserEntity;

class User extends ResourceController
{
    protected UserModel $userModel;
    public function __construct()
    {
        $this->userModel = model('UserModel');
    }

    public function index()
    {
        return $this->respond($this->userModel->findAll());
    }

    public function create()
    {
        $userEntity = new UserEntity($this->request->getJSON(true));

        if ($this->userModel->save($userEntity) === false) {
            return $this->fail('Bad request', 400);
        }

        $newRecordId = $this->userModel->getInsertID();

        return $this->response->setJSON($this->userModel->find($newRecordId));
    }

    public function update($id = null)
    {
        $userEntity = $this->userModel->find($id);
        $userEntity->fill($this->request->getJSON(true));

        if ($userEntity->hasChanged() && $this->userModel->save($userEntity) === false) {
            return $this->fail('Bad request', 400);
        }

        return $this->response->setJSON($this->userModel->find($id));
    }

    public function delete($id = null)
    {
        $user = $this->userModel->find($id);
        if ($user && $this->userModel->delete($id) === false) {
            return $this->fail('Bad request: ', 400);
        }

        return $this->respondDeleted(['id' => $id]);
    }
}
