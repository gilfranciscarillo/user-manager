<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;

class PreFlight extends BaseController
{
    public function options()
    {
        return $this->response->setStatusCode(200);
    }
}
