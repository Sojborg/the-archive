export const postRequest = async <T>(url: string, data: T) => {
  try {
    await fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });
  } catch (e) {}
};

export const getRequest = async <T>(url: string) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    }
    else {
      
    }
  } catch (e) {}
};