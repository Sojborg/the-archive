export const postRequest = async <T>(url: string, data: T): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer: ${window.localStorage.getItem('access_token')}`
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });

    if (response.status === 401 || response.status === 403) {
      window.localStorage.removeItem('access_token');
      window.location.assign('login');
    }

    if (response.ok) {
      const json = response.json();
      return json;
    }
  } catch (e) {}
};

export const getRequest = async <T>(url: string) => {
  try {
    const response = await fetch(url);

    if (response.status === 401 || response.status === 403) {
      window.localStorage.removeItem('access_token');
      window.location.assign('login');
    }

    if (response.ok) {
      return response.json();
    }
  } catch (e) {}
};