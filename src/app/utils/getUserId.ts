import { cookies } from 'next/headers';

export const getUserId = () => {
  const cookieStore = cookies();
  return cookieStore.get('user_id')?.value || "";
};
