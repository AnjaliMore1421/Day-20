# Day 20 – Full Real Deep Content

## Deep Theory

---

# 1. Full React App Architecture

React app architecture is the **overall structure and flow of the application**.  
It defines how components, pages, hooks, services, state, and routing are organized.

A well-structured architecture helps in:
- Scalability
- Maintainability
- Reusability
- Better debugging
- Team collaboration

### Main Flow
```text
UI Components → Hooks / State → API Services → Backend → Response → UI Update
```

### Important Points
- **Component-based design** for reusable UI
- **Unidirectional data flow** (Parent → Child)
- **Centralized state management**
- **Separate service layer for API calls**
- **Routing for multiple pages**
- **Protected routes for authentication**
- **Performance optimization with lazy loading**

---

# 2. Folder Structure Best Practices

A clean folder structure is one of the most important best practices.

```text
src/
├── components/        # Reusable UI components
├── pages/             # Page-level components
├── hooks/             # Custom reusable hooks
├── services/          # API calls / axios
├── context/           # Global state management
├── routes/            # Route setup
├── utils/             # Helper functions
├── assets/            # Images, icons, fonts
├── styles/            # CSS / Tailwind
├── App.jsx
└── main.jsx
```

### Best Practices
- Keep **UI components separate**
- Keep **API logic in services**
- Use **hooks folder for reusable logic**
- Keep **utility functions separate**
- Use **clear naming conventions**
- Group related files together

This makes the project easy to scale for large applications.

---

# 3. Reusable Hooks & Components

Reusable components and hooks improve code quality.

## Reusable Components
Used for repeated UI elements like:
- Buttons
- Cards
- Navbar
- Modal
- Input fields

```jsx
function Button({ title, onClick }) {
  return <button onClick={onClick}>{title}</button>;
}
```

## Reusable Hooks
Used for repeated logic.

Example:
```jsx
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData);
  }, [url]);

  return data;
}
```

### Benefits
- Less code duplication
- Better maintainability
- Cleaner components
- Faster development

---

# 4. API Error Boundary Design

API error handling is very important in real projects.

## Purpose
To handle:
- Network failures
- API timeout
- Invalid responses
- Server errors
- 404 / 500 errors

## Example
```jsx
try {
  const response = await axios.get("/users");
} catch (error) {
  console.error("API Error:", error.message);
}
```

## Error Boundary Component
```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}
```

### Important
This prevents the whole app from crashing.

---

# 5. Integration with Backend

Backend integration means connecting React frontend with server APIs.

Common tools:
- Fetch API
- Axios
- React Query

## Example
```jsx
import axios from "axios";

const getUsers = async () => {
  const response = await axios.get("http://localhost:5000/users");
  return response.data;
};
```

## Flow
```text
Frontend Request → Backend API → Database → Response → UI Update
```

### Important Points
- Use **axios instance**
- Use **interceptors**
- Handle loading & errors
- Store tokens securely
- Use environment variables for API URL

Example:
```jsx
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
```

---

