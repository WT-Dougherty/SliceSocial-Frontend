import { request } from '../lib/http';

// type imports
import { HttpMethod, RequestOptions } from '../types/request';
import { CommentType, PostType } from '../../../types/post';

export async function apiGetPostComments(
  postID: string,
): Promise<CommentType[]> {
  const requestOptions: RequestOptions = {
    method: 'GET' as HttpMethod,
    path: '/comments/',
    query: { postID: postID },
  };

  const response = await request(requestOptions);
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(
      `GET /comments/ failed: ${response.status} ${response.statusText} ${text}`,
    );
  }

  const data = (await response.json()) as CommentType[];
  if (data === null) {
    console.log('Comments Fetched. Comments Array: ', []);
    return [];
  }
  console.log('Comments Fetched. Comments Array: ', data);
  return data;
}

export async function apiPostNewComment(
  new_comment: CommentType,
): Promise<number> {
  const requestOptions: RequestOptions = {
    method: 'POST' as HttpMethod,
    path: '/comments/',
    body: new_comment,
  };

  const response = await request(requestOptions);
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    return response.status;
  }
  return response.status;
}
