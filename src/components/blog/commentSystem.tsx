import React, { useState, useEffect, useContext } from 'react';
import { Heart, MessageCircle, Send, User } from 'lucide-react';
import { AuthContext } from '@/App'; 

const CommentSystem = ({ postId = 1 }) => {
  const { isAuthenticated, username } = useContext(AuthContext);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ content: '' });
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem(`comments_${postId}`) || '[]');
    setComments(savedComments);
  }, [postId]);

  const saveComments = (updatedComments) => {
    localStorage.setItem(`comments_${postId}`, JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  const handleSubmitComment = () => {
    if (!username || !newComment.content.trim()) return;

    const comment = {
      id: Date.now(),
      name: username,
      content: newComment.content.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      liked: false,
      replies: []
    };

    saveComments([comment, ...comments]);
    setNewComment({ content: '' });
  };

  const handleSubmitReply = (parentId) => {
    if (!replyContent.trim()) return;

    const reply = {
      id: Date.now(),
      name: username || 'Anonymous',
      content: replyContent.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      liked: false
    };

    const updatedComments = comments.map((comment) => {
      if (comment.id === parentId) {
        return { ...comment, replies: [reply, ...comment.replies] };
      }
      return comment;
    });

    saveComments(updatedComments);
    setReplyContent('');
    setReplyingTo(null);
  };

  const handleLike = (commentId, isReply = false, parentId = null) => {
    const updatedComments = comments.map((comment) => {
      if (isReply && comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies.map((reply) => {
            if (reply.id === commentId) {
              return {
                ...reply,
                likes: reply.liked ? reply.likes - 1 : reply.likes + 1,
                liked: !reply.liked
              };
            }
            return reply;
          })
        };
      } else if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
          liked: !comment.liked
        };
      }
      return comment;
    });

    saveComments(updatedComments);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalComments = comments.reduce((total, comment) => total + 1 + comment.replies.length, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <section className="mt-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900">Comments</h2>
          <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            {totalComments} {totalComments === 1 ? 'Comment' : 'Comments'}
          </div>
        </div>

        {/* Comment Form */}
        {isAuthenticated ? (
          <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Comment as <span className="text-blue-600 font-bold">{username}</span>
            </h3>
            <textarea
              rows={4}
              value={newComment.content}
              onChange={(e) => setNewComment({ content: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y mb-4"
              placeholder="Share your thoughts..."
            />
            <button
              onClick={handleSubmitComment}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-md font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Post Comment</span>
            </button>
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-100 rounded-lg text-gray-500 border border-gray-200">
            <p className="text-lg">Please log in to leave a comment.</p>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No comments yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                    <p className="text-sm text-gray-500">{formatDate(comment.timestamp)}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{comment.content}</p>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm transition-colors ${
                      comment.liked
                        ? 'bg-red-100 text-red-600 border border-red-200'
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-red-50 hover:text-red-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${comment.liked ? 'fill-current' : ''}`} />
                    <span>{comment.likes}</span>
                  </button>

                  {isAuthenticated && (
                    <button
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      className="flex items-center space-x-2 px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600 border border-gray-200 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                  )}
                </div>

                {/* Reply Form */}
                {replyingTo === comment.id && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y"
                    />
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => handleSubmitReply(comment.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Reply
                      </button>
                      <button
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyContent('');
                        }}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-6 ml-8 space-y-4 border-l-2 border-blue-200 pl-6">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900">{reply.name}</h5>
                              <p className="text-xs text-gray-500">{formatDate(reply.timestamp)}</p>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-3 leading-relaxed">{reply.content}</p>

                        <button
                          onClick={() => handleLike(reply.id, true, comment.id)}
                          className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-colors ${
                            reply.liked
                              ? 'bg-red-100 text-red-600 border border-red-200'
                              : 'bg-white text-gray-600 border border-gray-200 hover:bg-red-50 hover:text-red-600'
                          }`}
                        >
                          <Heart className={`w-3 h-3 ${reply.liked ? 'fill-current' : ''}`} />
                          <span>{reply.likes}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default CommentSystem;