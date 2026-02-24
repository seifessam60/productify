import { useState } from "react";
import { useAddComment, useDeleteComment } from "../hooks/useComments";
import { Trash2Icon, MessageSquarePlusIcon } from "lucide-react";

function CommentsSection({ productId, userId, comments }) {
  const [content, setContent] = useState("");
  const addCommentMutation = useAddComment();
  const deleteCommentMutation = useDeleteComment(productId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    addCommentMutation.mutate(
      { productId, content },
      {
        onSuccess: () => setContent(""),
      },
    );
  };

  const handleDelete = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteCommentMutation.mutate(commentId);
    }
  };

  return (
    <div className="mt-20 border-t border-base-300 pt-12">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          Comments
          <span className="badge badge-primary">{comments.length}</span>
        </h3>
      </div>

      {/* ADD COMMENT FORM */}
      {userId ? (
        <form onSubmit={handleSubmit} className="mb-10">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Share your thoughts
              </span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Write a comment..."
                className="input input-bordered flex-1 focus:input-primary transition-all"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={addCommentMutation.isPending}
              >
                {addCommentMutation.isPending ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <>
                    <MessageSquarePlusIcon className="size-4" />
                    Post
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="alert bg-base-200 border-none mb-10">
          <p className="text-sm text-base-content/60">
            Please sign in to join the conversation.
          </p>
        </div>
      )}

      {/* COMMENTS LIST */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="bg-base-200/50 rounded-2xl p-8 text-center border border-dashed border-base-300">
            <p className="text-base-content/50 italic">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          comments.map((comment) => {
            const isOwnComment = userId === comment.userId;
            return (
              <div key={comment.id} className={`chat chat-start group`}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={comment.user?.imageUrl || "/default-avatar.png"}
                      alt={comment.user?.name}
                    />
                  </div>
                </div>
                <div className="chat-header mb-1 flex items-center gap-2">
                  <span className="font-bold text-xs">
                    {comment.user?.name || "Anonymous"}
                  </span>
                  <time className="text-[10px] opacity-50">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </time>
                </div>
                <div
                  className={`chat-bubble shadow-md ${
                    isOwnComment
                      ? "chat-bubble-primary"
                      : "bg-base-300 text-base-content"
                  }`}
                >
                  {comment.content}
                </div>
                <div className="chat-footer opacity-50 mt-1">
                  {isOwnComment && (
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="btn btn-ghost btn-xs text-error h-auto min-h-0 py-0.5"
                      disabled={deleteCommentMutation.isPending}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default CommentsSection;
