import { request } from '../lib/http';

// type imports
import { HttpMethod, RequestOptions } from '../types/request';
import { PostType } from '../../../types/post';

export async function apiGetUserPosts(userID: string): Promise<PostType[]> {
  let getErr: unknown;
  const requestOptions: RequestOptions = {
    method: 'GET' as HttpMethod,
    path: '/posts/',
    query: { userID: userID },
  };

  const response = await request(requestOptions);
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(
      `GET /posts/ failed: ${response.status} ${response.statusText} ${text}`,
    );
  }

  const data = (await response.json()) as PostType[];
  if (data === null) {
    console.log('Posts Fetched. Posts Array: ', []);
    return [];
  }
  console.log('Posts Fetched. Posts Array: ', data);
  return data;
}
