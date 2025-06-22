import { http, HttpResponse } from 'msw'

const fetchUserUrl = "/api/user";

export const handlers = [
  http.get(fetchUserUrl, () => {
    return HttpResponse.json(
      {
        id: 1,
        name: "John Doe",
        username: "johndoe",
        email: "john.doe@example.com",
      },
      { status: 200 }
    );
  }),
];

