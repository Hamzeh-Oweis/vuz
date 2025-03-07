import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/Card/card";
import { FC, useState } from "react";
// import { useCommentStore } from "@/store/useCommentStore";
import { Post } from "@/store/usePostStore";

interface PostCardProps {
  post: Post;
  // onClick: (postId: number) => void;
}

const PostCard: FC<PostCardProps> = ({ post: postParam }) => {
  const [post] = useState<Post>({ ...postParam });

  return (
    <Card className={cn("w-[605px]", "h-[650px]")}>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-start">
        <p>{post.body}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2">
        {post.comments?.map((comment) => (
          <div
            key={comment.id}
            className="max-w-[500px] break-all text-sm bg-slate-100 p-3 rounded-sm text-start"
          >
            <p>{comment.body}</p>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
