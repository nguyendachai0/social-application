<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\FriendRequest;
use App\Models\User; // Make sure to include the User model

class FriendRequestController extends Controller
{
    public function sendRequest(Request $request)
    {
        $request->validate([
            'recipientId' => 'required|exists:users,id',
        ]);

        $receiver_id = $request->input('recipientId');
        $senderId = Auth::id();

        if ($senderId === (int)$receiver_id) {
            return response()->json([
                'success' => false,
                'message' => 'You cannot send a friend request to yourself.',
                'countFriends' => $this->getFriendCount($senderId),
                'friendRequest' => $this->getFriendRequest($senderId, $receiver_id)
            ], 400);
        }

        $existingRequest = FriendRequest::where(function ($query) use ($senderId, $receiver_id) {
            $query->where('sender_id', $senderId)
                ->where('receiver_id', $receiver_id);
        })->orWhere(function ($query) use ($senderId, $receiver_id) {
            $query->where('sender_id', $receiver_id)
                ->where('receiver_id', $senderId);
        })->first();

        if ($existingRequest) {
            if ($existingRequest->status == 'rejected') {
                $existingRequest->update(['status' => 'accepted']);
                return response()->json([
                    'success' => true,
                    'message' => 'Friend request re-accepted.',
                    'countFriends' => $this->getFriendCount($senderId),
                    'friendRequest' => $this->getFriendRequest($senderId, $receiver_id)
                ]);
            }
            return response()->json([
                'success' => false,
                'message' => 'Friend request already exists.',
                'countFriends' => $this->getFriendCount($senderId),
                'friendRequest' => $this->getFriendRequest($senderId, $receiver_id)
            ], 400);
        }

        FriendRequest::create([
            'sender_id' => $senderId,
            'receiver_id' => $receiver_id,
            'status' => 'pending'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Friend request sent successfully.',
            'countFriends' => $this->getFriendCount($senderId),
            'friendRequest' => $this->getFriendRequest($senderId, $receiver_id)
        ]);
    }

    public function cancelRequest(Request $request)
    {
        $request->validate([
            'recipientId' => 'required|exists:users,id',
        ]);

        $receiver_id = $request->input('recipientId');
        $senderId = Auth::id();

        $existingRequest = FriendRequest::where(function ($query) use ($senderId, $receiver_id) {
            $query->where('sender_id', $senderId)
                ->where('receiver_id', $receiver_id);
        })->orWhere(function ($query) use ($senderId, $receiver_id) {
            $query->where('sender_id', $receiver_id)
                ->where('receiver_id', $senderId);
        })->first();

        if (!$existingRequest) {
            return response()->json([
                'success' => false,
                'message' => 'Friend request not found.',
                'countFriends' => $this->getFriendCount($senderId),
                'friendRequest' => $this->getFriendRequest($senderId, $receiver_id)
            ]);
        }

        $existingRequest->delete();

        return response()->json([
            'success' => true,
            'message' => 'Friend request cancelled successfully.',
            'countFriends' => $this->getFriendCount($senderId),
            'friendRequest' => $this->getFriendRequest($senderId, $receiver_id)
        ]);
    }

    public function acceptFriendRequest(Request $request)
    {
        $request->validate([
            'senderId'  =>  'required|exists:users,id',
        ]);

        $senderId = $request->input('senderId');
        $receiverId = Auth::id();
        $friendRequest = FriendRequest::where('sender_id', $senderId)
            ->where('receiver_id', $receiverId)
            ->where('status', 'pending')
            ->first();

        if (!$friendRequest) {
            return response()->json([
                'success' => false,
                'message' => 'Friend request not found.',
                'countFriends' => $this->getFriendCount($receiverId),
                'friendRequest' => $this->getFriendRequest($receiverId, $senderId)
            ], 404);
        }

        $friendRequest->update(['status' => 'accepted']);

        return response()->json([
            'success' => true,
            'message' => 'Friend request accepted.',
            'countFriends' => $this->getFriendCount($receiverId),
            'friendRequest' => $this->getFriendRequest($receiverId, $senderId)
        ]);
    }

    public function declineFriendRequest(Request $request)
    {
        $request->validate([
            'senderId'  =>  'required|exists:users,id',
        ]);

        $senderId = $request->input('senderId');
        $receiverId = Auth::id();

        $friendRequest = FriendRequest::where('sender_id', $senderId)
            ->where('receiver_id', $receiverId)
            ->where('status', 'pending')
            ->first();

        if (!$friendRequest) {
            return response()->json([
                'success' => false,
                'message' => 'Friend request not found.',
                'countFriends' => $this->getFriendCount($receiverId),
                'friendRequest' => $this->getFriendRequest($receiverId, $senderId)
            ], 404);
        }

        $friendRequest->update(['status' => 'rejected']);

        return response()->json([
            'success' => true,
            'message' => 'Friend request declined.',
            'countFriends' => $this->getFriendCount($receiverId),
            'friendRequest' => $this->getFriendRequest($receiverId, $senderId)
        ]);
    }

    public function removeFriend(Request $request)
    {
        $request->validate([
            'friendId' => 'required|exists:users,id',
        ]);

        $friendId = $request->input('friendId');
        $userId = Auth::id();

        $friendship = FriendRequest::where(function ($query) use ($userId, $friendId) {
            $query->where('sender_id', $userId)
                ->where('receiver_id', $friendId);
        })->orWhere(function ($query) use ($userId, $friendId) {
            $query->where('sender_id', $friendId)
                ->where('receiver_id', $userId);
        })->where('status', 'accepted')
            ->first();

        if (!$friendship) {
            return response()->json([
                'success' => false,
                'message' => 'Friendship not found.',
                'countFriends' => $this->getFriendCount($userId),
                'friendRequest' => null // No friend request details
            ], 404);
        }

        $friendship->delete();

        return response()->json([
            'success' => true,
            'message' => 'Friend removed successfully.',
            'countFriends' => $this->getFriendCount($userId),
            'friendRequest' => null // No friend request details
        ]);
    }

    // Helper methods to get friend count and friend request details
    protected function getFriendCount($userId)
    {
        // Count friends based on accepted status
        return FriendRequest::where(function ($query) use ($userId) {
            $query->where('sender_id', $userId)
                ->where('status', 'accepted');
        })->orWhere(function ($query) use ($userId) {
            $query->where('receiver_id', $userId)
                ->where('status', 'accepted');
        })->count();
    }

    protected function getFriendRequest($userId, $otherId)
    {
        // Get the friend request details between two users
        return FriendRequest::where(function ($query) use ($userId, $otherId) {
            $query->where('sender_id', $userId)
                ->where('receiver_id', $otherId);
        })->orWhere(function ($query) use ($userId, $otherId) {
            $query->where('sender_id', $otherId)
                ->where('receiver_id', $userId);
        })->first();
    }
}
