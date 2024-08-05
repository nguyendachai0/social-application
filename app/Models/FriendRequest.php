<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FriendRequest extends Model
{
    use HasFactory;
    protected $table = "friend_requests";
    protected $fillable = [
        'sender_id',
        'receiver_id',
        'status',
        'sent_at',
        'responded_at'
    ];
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
    public function notifcations()
    {
        return $this->hasMany(Notification::class, 'reference');
    }
}
