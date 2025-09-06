export interface CommentType {
    commentID: string,
    body: string,
    date: string,           // iso string
    username: string,
};

export interface PostType {
    postID: string,
    userID: string,
    username: string,
    caption: string,
    posted_at: string,      // iso string
    comment_count: number,
    like_count: number,
};