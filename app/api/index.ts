const base = "http://0.0.0.0:8000/api/v1/";

export default async function api(
  route: string,
  method: string = "GET",
  handleSuccess: (data: any) => void,
  handleError: (error: { error: string }) => void,
  token?: string,
  body?: object,
) {
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
  });

  if (token) {
    headers.set("Authorization", `Barer ${token}`);
  }

  try {
    const response = await fetch(`${base}${route}`, {
      method,
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      handleSuccess(data);
    } else {
      handleError(data);
    }
  } catch (error) {
    handleError({
      error,
    });
  }
}
