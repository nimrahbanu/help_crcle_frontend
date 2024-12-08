// utils/api.ts

// this will fetch data on server side

export async function getData(userId: string) {






    const res = await fetch('https://api.helpcircle.in/api/customer/dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch dashboard data');
    }
  
    const responseData = await res.json();

  
    if (responseData.success) {
      return responseData; // Return the data if success is true
    } else {
      throw new Error(responseData.message || 'Failed to retrieve data'); // Throw an error if success is false
    }
  }
  