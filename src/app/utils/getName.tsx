


import { cookies } from 'next/headers';

export const getName = () => {
  const cookieStore = cookies();
  return cookieStore.get('name')?.value || "";
};
