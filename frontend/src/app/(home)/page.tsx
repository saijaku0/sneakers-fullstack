'use client'; // 👈 Важно для Next.js App Router, если используем useState

import { useState, useEffect } from 'react';

interface Sneaker {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface PagedResult<T> {
  items: T[];
  totalCount: number;
}

const API_URL = "https://localhost:7123/api";

export default function Home() {
  const [sneakers, setSneakers] = useState<Sneaker[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSneakers();
  }, []);

  const fetchSneakers = async () => {
    try {
      const response = await fetch(`${API_URL}/sneakers`);
      
      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }

      const data = await response.json();
      
      if (Array.isArray(data)) {
          setSneakers(data);
      } else if (data.items) {
          setSneakers(data.items);
      } else {
          console.error("Непонятный формат ответа:", data);
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>👟 Магазин Кроссовок</h1>

      {error && <div style={{ color: 'red' }}>Ошибка: {error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {sneakers.map((sneaker) => (
          <div key={sneaker.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            {sneaker.imageUrl ? (
                <img 
                    src={sneaker.imageUrl} 
                    alt={sneaker.title} 
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }} 
                />
            ) : (
                <div style={{height: '150px', background: '#eee'}}>Нет фото</div>
            )}
            
            <h3>{sneaker.title}</h3>
            <p>{sneaker.description}</p>
            <p style={{ fontWeight: 'bold' }}>$ {sneaker.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}