import { create } from "zustand";
import { fetchPosts } from "@/utils/api";
import debounce from "lodash.debounce";

export interface Post {
    id: number;
    title: string;
    body: string;
    comments: Comment[];
}

export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

interface PostStore {
    posts: Post[];
    page: number;
    isMorePages: boolean;
    loading: boolean;
    error: string | null;
    fetchMorePosts: (userId: number) => void;
}

export const usePostStore = create<PostStore>((set, get) => {
    const fetchMorePosts = async (userId: number) => {
        const { page, posts } = get();
        set({ loading: true, error: null });
        try {
            const newPosts = await fetchPosts(userId, page);
            set({
                posts: [...posts, ...newPosts],
                page: newPosts.length ? page + 1 : page,
                loading: false,
                isMorePages: newPosts.length > 0,
            });
        } catch (error) {
            console.error("Failed to fetch posts", error);
            set({ error: "Failed to fetch posts", loading: false });
        }
    };

    const debouncedFetchMorePosts = debounce(fetchMorePosts, 500);

    return {
        posts: [],
        page: 1,
        isMorePages: true,
        loading: false,
        error: null,
        fetchPosts: fetchPosts,
        fetchMorePosts: debouncedFetchMorePosts,
    };
});
