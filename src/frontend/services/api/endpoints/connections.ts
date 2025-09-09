import { request } from '../lib/http';

// type imports
import { HttpMethod, RequestOptions } from '../types/request';

export async function apiGetFriends(userID: string): Promise<string[]> {
  const requestOptions: RequestOptions = {
    method: 'GET' as HttpMethod,
    path: '/connections/',
    query: { userID: userID },
  };

  const response = await request(requestOptions);
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(
      `GET /users/ failed: ${response.status} ${response.statusText} ${text}`,
    );
  }
  const data = (await response.json()) as string[];
  console.log('Friends Fetched');
  return data;
}
