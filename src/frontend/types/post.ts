export interface DateType {
    day: string,
    month: string,
    year: string
};

export interface CommentType {
    commentID: string,
    body: string,
    date: DateType,
    username: string
};

export interface PostType {
    postID: string,
    username: string,
    date: DateType,
    body: string,
    likes: number,
    comments: Array<CommentType>
};