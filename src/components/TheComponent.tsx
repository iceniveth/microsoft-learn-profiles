import { useState } from "react";

export default function TheComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>TheComponent</h2>
      <h3>Counter {count}</h3>
      <button onClick={() => setCount(count => count + 1)}>Increment</button>
    </div>
  );
}