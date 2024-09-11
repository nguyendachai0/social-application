<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $posts = Post::where('user_id', $user->id)->get();

        return response()->json($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' =>  'required|exists:users,id',
            'caption' =>  'string',
            'attachments.*' => 'file|mimes:jpg,png,pdf,docx|max:2048'
        ]);

        $post = Post::create($request->only('user_id', 'caption'));

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $attachment) {
                $path = $attachment->store('attachments');
                $post->attachments()->create([
                    'name' => $attachment->getClientOriginalName(),
                    'path' => $path,
                    'mime' => $attachment->getMimeType(),
                    'size' => $attachment->getSize()
                ]);
            }
        }
        return response()->json($post, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::findOrFail($id);
        return response()->json($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $post = Post::findOrFail($id);
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'caption' => 'string',
            'attachements.*' => 'file|mimes:jpg,png,pdf,docx|max:2048'
        ]);

        $post->update($request->only('user_id', 'caption'));

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $attachment) {
                $path = $attachment->store('attachments');
                $post->attachments()->create([
                    'name' => $attachment->getClientOriginalName(),
                    'path' => $path,
                    'mime' => $attachment->getMimeType(),
                    'size' => $attachment->getSize()
                ]);
            }
        }

        return response()->json($post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::findOrFail($id);

        $post->attachments()->delete();
        $post->comments()->delete();
        $post->reactions()->delete();
        $post->notifications()->delete();

        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }
}
