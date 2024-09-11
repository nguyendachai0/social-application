<?php

namespace App\Http\Controllers;

use App\Models\FriendRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;


class UserController extends Controller
{
    public function profile($email)
    {
        $user = User::where('email', $email)->firstOrFail();
        $senderId = auth()->id();
        $recipientId = $user->id;
        $countFriends = count($user->friends);
        $friendRequest = FriendRequest::where(function ($query) use ($senderId, $recipientId) {
            $query->where('sender_id', $senderId)
                ->where('receiver_id', $recipientId);
        })->orWhere(function ($query) use ($senderId, $recipientId) {
            $query->where('sender_id', $recipientId)
                ->where('receiver_id', $senderId);
        })->first();

        return Inertia::render('ProfilePage', [
            'profile' => $user,
            'countFriends' => $countFriends,
            'friendRequest' => $friendRequest,
        ]);
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg, png, jpg, gif|max:2048',
            'type'  => 'required|in:avatar,banner'
        ]);

        $user = auth()->user();
        $image  = $request->file('image');
        $type = $request->input('type');

        $imageName = time() .  '.'  . $image->extension();

        $imagePath  = $image->storeAs('public/' . $type . 's',  $imageName);

        $user->{$type} =  $imageName;
        $user->save();

        return response()->json(['success' => true, 'message' => ucfirst($type) . ' updated successfully!', 'image_url' => Storage::url($imagePath)]);
    }
}
