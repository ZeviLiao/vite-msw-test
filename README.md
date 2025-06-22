為何更新 . 目前在測試時，出現 msw 2 相容性問題。


src/mocks/browser.js
```
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
```

src/mocks/handlers.js
```
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

```

src/main.jsx
```
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const { worker } = await import('./mocks/browser')
  await worker.start()
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
})
```

run
```
npm run dev

// then display
Vite + React + MSW Template (JavaScript)
User: John Doe
```
