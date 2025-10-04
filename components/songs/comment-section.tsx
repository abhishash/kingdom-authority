"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, MoreHorizontal, Reply, Flag, ChevronDown, ChevronUp } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
    username: string
    verified?: boolean
  }
  content: string
  timestamp: string
  likes: number
  replies: Comment[]
  isLiked?: boolean
}

const mockComments: Comment[] = [
  {
    id: "1",
    author: {
      name: "Sarah Chen",
      avatar: "/comments/professional-woman-diverse.png",
      username: "@sarahchen",
      verified: true,
    },
    content:
      "This is exactly what we needed for our project! The implementation is clean and the performance improvements are noticeable. Great work on the documentation too.",
    timestamp: "2h ago",
    likes: 24,
    isLiked: true,
    replies: [
      {
        id: "1-1",
        author: {
          name: "Alex Rodriguez",
          avatar: "/comments/developer-man.png",
          username: "@alexdev",
        },
        content: "Completely agree! We've been using this in production for a week now and it's been solid.",
        timestamp: "1h ago",
        likes: 8,
        replies: [],
      },
    ],
  },
  {
    id: "2",
    author: {
      name: "Marcus Johnson",
      avatar: "/comments/designer-man.jpg",
      username: "@marcusj",
    },
    content:
      "Love the attention to detail in the UI components. The dark mode implementation is particularly well done. Any plans for additional themes?",
    timestamp: "4h ago",
    likes: 15,
    replies: [],
  },
  {
    id: "3",
    author: {
      name: "Emma Wilson",
      avatar: "/comments/product-manager-woman.jpg",
      username: "@emmaw",
      verified: true,
    },
    content:
      "This solves a major pain point for our team. The integration was seamless and the performance metrics speak for themselves. Highly recommend!",
    timestamp: "6h ago",
    likes: 31,
    replies: [
      {
        id: "3-1",
        author: {
          name: "David Kim",
          avatar: "/comments/engineer-man.png",
          username: "@davidk",
        },
        content: "What kind of performance improvements are you seeing? We're considering implementing this.",
        timestamp: "5h ago",
        likes: 3,
        replies: [],
      },
      {
        id: "3-2",
        author: {
          name: "Emma Wilson",
          avatar: "/comments/product-manager-woman.jpg",
          username: "@emmaw",
          verified: true,
        },
        content:
          "We're seeing about 40% faster load times and significantly better user engagement. Happy to share more details if you're interested!",
        timestamp: "4h ago",
        likes: 12,
        replies: [],
      },
    ],
  },
]

interface CommentItemProps {
  comment: Comment
  isReply?: boolean
  onReply?: (commentId: string) => void
}

function CommentItem({ comment, isReply = false, onReply }: CommentItemProps) {
  const [isLiked, setIsLiked] = useState(comment.isLiked || false)
  const [likes, setLikes] = useState(comment.likes)
  const [showReplies, setShowReplies] = useState(true)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  return (
    <div className={`${isReply ? "ml-12 mt-3" : "mb-6"}`}>
      <Card className="p-4 bg-card border-border">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
            <AvatarFallback>
              {comment.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-sm text-foreground">{comment.author.name}</h4>
              <span className="text-xs text-muted-foreground">{comment.author.username}</span>
              {comment.author.verified && (
                <Badge variant="secondary" className="h-4 px-1.5 text-xs bg-accent text-accent-foreground">
                  Verified
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
            </div>

            <p className="text-sm text-foreground leading-relaxed mb-3">{comment.content}</p>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 px-2 gap-1.5 ${isLiked ? "text-red-500" : "text-muted-foreground"} hover:text-red-500`}
                onClick={handleLike}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                <span className="text-xs">{likes}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 gap-1.5 text-muted-foreground hover:text-foreground"
                onClick={() => onReply?.(comment.id)}
              >
                <Reply className="h-4 w-4" />
                <span className="text-xs">Reply</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="gap-2">
                    <Flag className="h-4 w-4" />
                    Report comment
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </Card>

      {comment.replies.length > 0 && (
        <div className="mt-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 gap-1.5 text-muted-foreground hover:text-foreground mb-2"
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            <span className="text-xs">
              {showReplies ? "Hide" : "Show"} {comment.replies.length}{" "}
              {comment.replies.length === 1 ? "reply" : "replies"}
            </span>
          </Button>

          {showReplies && (
            <div className="space-y-3">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} isReply={true} onReply={onReply} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function CommentSection() {
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    // Handle comment submission logic here
    console.log("New comment:", newComment)
    setNewComment("")
    setReplyingTo(null)
  }

  const handleReply = (commentId: string) => {
    setReplyingTo(commentId)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Comments</h2>
        <p className="text-muted-foreground">Join the conversation and share your thoughts</p>
      </div>

      {/* Comment Form */}
      <Card className="p-4 mb-8 bg-card border-border">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage src="/diverse-user-avatars.png" alt="Your avatar" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <Textarea
                placeholder={replyingTo ? "Write a reply..." : "Share your thoughts..."}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px] resize-none bg-background border-border text-foreground placeholder:text-muted-foreground"
              />

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Be respectful and constructive in your comments</span>
                </div>

                <div className="flex gap-2">
                  {replyingTo && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setReplyingTo(null)
                        setNewComment("")
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!newComment.trim()}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    {replyingTo ? "Reply" : "Comment"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Card>

      {/* Comments List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">{mockComments.length} Comments</h3>
        </div>

        {mockComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} onReply={handleReply} />
        ))}
      </div>
    </div>
  )
}
