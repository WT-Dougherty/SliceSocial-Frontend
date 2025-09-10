export interface CommentType {
  postID: string;
  commentID?: string;
  username: string;
  comment: string;
  posted_at?: string;
}

export interface PostType {
  postID: string;
  userID: string;
  username: string;
  caption: string;
  posted_at: string;
  comment_count: number;
  like_count: number;
}
