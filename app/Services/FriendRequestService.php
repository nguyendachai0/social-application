<?php

namespace App\Services;

use App\Repositories\FriendRequestRepositoryInterface;
use App\Services\FriendRequestServiceInterface;

class FriendRequestService  implements FriendRequestServiceInterface
{
    private $friendRequestRepository;
    public function construct(FriendRequestRepositoryInterface $friendRequestRepositoryInterface)
    {
        $this->friendRequestRepository = $friendRequestRepositoryInterface;
    }
    public function createFriendRequest(array $data)
    {
        return $this->friendRequestRepository->create($data);
    }
}
