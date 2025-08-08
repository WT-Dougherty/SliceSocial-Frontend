import { PostType } from "../types/post";

export const samplePost : PostType = {
    postID: '0',
    username: "Will",
    date: {
        day: "06",
        month: "August",
        year: "2025"
    },
    body: 'https://www.meisterdrucke.ie/kunstwerke/1000px/Caspar%20David%20Friedrich%20-%20Der%20Wanderer%20ber%20dem%20Nebelmeer%20-%20(MeisterDrucke-680291).jpg',
    likes: 10,
    comments: [
        {
            commentID: '0',
            body: "Comment 1!",
            date: {
                day: "06",
                month: "August",
                year: "2025"
            },
            username: "Stan"
        },
        {
            commentID: '1',
            body: "Comment 2!",
            date: {
                day: "06",
                month: "August",
                year: "2025"
            },
            username: "Stan"
        },
        {
            commentID: '2',
            body: "Comment 3!",
            date: {
                day: "06",
                month: "August",
                year: "2025"
            },
            username: "Stan"
        },
        {
            commentID: '3',
            body: "Comment 4!",
            date: {
                day: "06",
                month: "August",
                year: "2025"
            },
            username: "Stan"
        }
    ]
};