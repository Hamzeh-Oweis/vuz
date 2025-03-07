import { useCallback, useEffect, useRef } from "react";
import PostCard from "./PostCard";
import { usePostStore } from "@/store/usePostStore";
import clsx from "clsx";

interface PostListProps {
  userId: number;
}

const PostList = ({ userId }: PostListProps) => {
  const { posts, loading, error, fetchMorePosts, isMorePages } = usePostStore();
  const loader = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && isMorePages) {
        fetchMorePosts(userId);
      }
    },
    [fetchMorePosts, isMorePages, loading, userId]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }
    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [handleObserver]);

  return (
    <div className="flex flex-row items-center justify-around flex-wrap gap-1">
      {posts.map((post) => (
        // <div className="flex flex-row items-center justify-around w-full">
        <PostCard
          key={post.id}
          post={{ ...post }}
        />
        // </div>
      ))}
      {/* {loading && <p>Loading more posts...</p>} */}
      {error && <p>{error}</p>}
      {/* This div acts as the trigger for infinite scrolling */}
      {/* {isMorePages && ( */}
      <span
        ref={loader}
        className={clsx({
          // visible: loading,
          invisible: !loading,
          loader: true,
        })}
      ></span>
      {/* )} */}
    </div>
  );
};

export default PostList;
