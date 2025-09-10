import { request } from '../lib/http';

// type imports
import { HttpMethod, RequestOptions } from '../types/request';

export async function apiGetUsername(userID: string): Promise<string> {
  const requestOptions: RequestOptions = {
    method: 'GET' as HttpMethod,
    path: '/users/username',
    query: { userID: userID },
  };

  const response = await request(requestOptions);
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(
      `GET /users/username failed: ${response.status} ${response.statusText} ${text}`,
    );
  }

  const data = await response.json();
  return data[0];
}
