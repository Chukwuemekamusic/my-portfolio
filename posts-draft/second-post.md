---
title: "Understanding React Hooks"
date: "2024-01-30"
description: "An introduction to React Hooks and how they simplify state management in functional components."
---

# Understanding React Hooks

React Hooks allow you to use state and lifecycle methods in functional components, making your code more concise and readable.

## Why React Hooks?

- **Simplifies state management**: No need for class components.
- **Reusability**: Extract logic into custom hooks.
- **Cleaner code**: Avoids complex class-based structures.

## Common Hooks

### useState

Manages local state in a function component.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### useEffect

Handles side effects in functional components.

```jsx
import { useEffect, useState } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <p>Elapsed time: {seconds}s</p>;
}
```

Hooks make React development more intuitive and powerful.
