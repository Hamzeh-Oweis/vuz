import { Post } from "@/store/usePostStore";
import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const fetchPosts = async (userId: number, page: number) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts?userId=${userId}&_page=${page}&_limit=2`);

        const posts = response.data as Post[];
        const postsData: Post[] = [];

        for (let index = 0; index < posts.length; index++) {
            const post = posts[index];
            const commentResponse = await axios.get(`${API_BASE_URL}/comments?postId=${post.id}`);
            const comments = commentResponse.data;
            postsData.push({ ...post, comments });
        }

        // posts.forEach(post => {
        //     const commentResponse = await axios.get(`${API_BASE_URL}/comments?postId=${post.id}`);
        //     const comments = commentResponse.data;
        //     postsData.push({ ...post, comments });
        // });

        // const postsData = posts.map( (post) => {
        //     const commentResponse = await axios.get(`${API_BASE_URL}/comments?postId=${post.id}`);
        //     const comments = commentResponse.data;
        //     return { ...post, comments };
        // });

        return postsData;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}

export const fetchComments = async (postId: number) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/comments?postId=${postId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
}
