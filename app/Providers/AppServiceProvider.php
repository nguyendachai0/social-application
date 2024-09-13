<?php

namespace App\Providers;

use App\Models\FriendRequest;
use App\Repositories\FriendRequests\FriendRequestRepository;
use App\Repositories\FriendRequests\FriendRequestRepositoryInterface;
use App\Repositories\Messages\MessageRepository;
use App\Repositories\Messages\MessageRepositoryInterface;
use App\Services\FriendRequests\FriendRequestServiceInterface;
use App\Services\FriendRequests\FriendRequestService;
use App\Services\Messages\MessageService;
use App\Services\Messages\MessageServiceInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(MessageRepositoryInterface::class, MessageRepository::class);
        $this->app->bind(MessageServiceInterface::class, MessageService::class);
        $this->app->bind(FriendRequestRepositoryInterface::class, FriendRequestRepository::class);
        $this->app->bind(FriendRequestServiceInterface::class, FriendRequestService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
