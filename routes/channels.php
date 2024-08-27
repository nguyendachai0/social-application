<?php

use App\Events\UserConnected;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;


Broadcast::channel('online', function ($user) {
    return $user ? new UserResource($user) : null;
});

Broadcast::channel('message.user.{userId1}-{userId2}', function (User $user, int $userId1, int $userId2) {
    if ($user->id === $userId1 || $user->id === $userId2) {
        $otherUserId = $user->id === $userId1 ?  $userId2 : $userId1;
        event(new UserConnected("message.user.{$userId1}-{$userId2}", $otherUserId));
        return $user;
    }
    return null;
});

Broadcast::channel('message.group.{groupId}', function (User  $user, int $groupId) {
    return $user->groups->contains('id', $groupId) ?  $user  : null;
});

Broadcast::channel('user-connected.{id}', function ($user, $id) {
    Log::info(
        'Other user also connected',
        ['user_id' => $id, 'channel' => "user-connected.{$id}"]
    );
    return (int) $user->id === (int) $id;
});
