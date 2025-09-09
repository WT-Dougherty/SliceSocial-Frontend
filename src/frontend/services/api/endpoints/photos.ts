import { request } from '../lib/http';

// type imports
import { HttpMethod, RequestOptions } from '../types/request';

export async function apiGetProPic(userID: string): Promise<string> {
  const requestOptions: RequestOptions = {
    method: 'GET' as HttpMethod,
    path: '/images/propic',
    query: { userID: userID },
  };

  const response = await request(requestOptions);
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(
      `GET /users/propic failed: ${response.status} ${response.statusText} ${text}`,
    );
  }
  const blob = await response.blob();
  //   return URL.createObjectURL(blob);
  return await blobToDataURL(blob);
}

export async function apiGetPostPhoto(postID: string): Promise<string> {
  const requestOptions: RequestOptions = {
    method: 'GET' as HttpMethod,
    path: '/images/post',
    query: { postID: postID },
  };

  const response = await request(requestOptions);
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(
      `GET /users/propic failed: ${response.status} ${response.statusText} ${text}`,
    );
  }
  const blob = await response.blob();
  return await blobToDataURL(blob);
}

async function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onloadend = () => resolve(fr.result as string); // "data:image/png;base64,AAAA..."
    fr.onerror = reject;
    fr.readAsDataURL(blob);
  });
}
