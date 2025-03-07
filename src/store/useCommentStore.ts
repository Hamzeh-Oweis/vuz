import { create } from "zustand";
import { fetchComments } from "@/utils/api";

export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

interface CommentStore {
    comments: Comment[];
    loading: boolean;
    error: string | null;
    fetchComments: (postId: number) => Promise<void>;
}

export const useCommentStore = create<CommentStore>((set) => ({
    comments: [],
    loading: false,
    error: null,

    fetchComments: async (postId: number) => {
        set({ loading: true, error: null });
        try {
            const comments = await fetchComments(postId);
            set({ comments, loading: false });
        } catch (error) {
            set({ error: "Failed to fetch comments", loading: false });
            console.error("Failed to fetch comments:", error);
        }
    }
}));
