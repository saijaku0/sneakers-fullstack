# 👟 Sneakers Shop Fullstack
![Project Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![.NET](https://img.shields.io/badge/.NET-8.0-purple)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![EF Core](https://img.shields.io/badge/EF%20Core-ORM-green)
![Architecture](https://img.shields.io/badge/Architecture-Clean%20%28Onion%29-orange)

**Sneakers Shop** — is a modern Fullstack online sneaker store designed to demonstrate the complete lifecycle of an *E-commerce* application: from browsing the catalog to placing an actual order.

The project is built with a focus on clean architecture, performance, and scalability.

---

## 📸 Screenshots
<img width="1902" height="915" alt="image" src="https://github.com/user-attachments/assets/d771ba9d-3da3-473f-854c-62bc6b110b0d" />

---

<img width="1903" height="903" alt="image" src="https://github.com/user-attachments/assets/e3ccbc80-efea-4a29-872a-5c90f17411b3" />

---

<img width="1902" height="909" alt="image" src="https://github.com/user-attachments/assets/6e73405d-3b6d-4024-bf5d-52c34cacbcca" />

---

<img width="1916" height="911" alt="image" src="https://github.com/user-attachments/assets/1bf10fef-7ff2-4bc6-81e5-35ce1f8e679b" />

---

## 🛠 Tech Stack

### 🎨 Frontend
The application is built on a modern React ecosystem stack using **Feature-Sliced Design (FSD)** for maximum modularity.

| Технология | Назначение |
|------------|------------|
| **Next.js 16** | App Router, hybrid SSR/CSR rendering |
| **TypeScript** | Strict typing for code reliability |
| **Redux Toolkit** | Global state management (Cart, Filters) |
| **RTK Query** | Caching and API interaction |
| **Tailwind CSS** | Responsive and fast UI styling |
| **Lucide React** | Iconography |

### ⚙️ Backend
A reliable and high-performance RESTful API built on the **.NET 10** platform.

| Technology | Purpose |
|------------|------------|
| **C# / ASP.NET Core** | REST API architecture |
| **PostgreSQL** | Primary relational database |
| **Entity Framework Core** | ORM for data handling |
| **Docker** | Application and DB containerization |
| **Swagger** | API Documentation |

---

## 🏗 Architecture

### 🎨 Frontend: Feature-Sliced Design (FSD)
The frontend employs the **FSD** methodology. This structure prevents spaghetti code and ensures predictable navigation:

* **Avoids tight coupling** between modules (Low Coupling).
* **Scalable:** Easy to add new features without breaking existing logic.

``` 
src/
├── app/        # Application initialization and routing (Next.js App Router)
├── processes/  # Global processes (e.g., authentication)
├── views/      # Composition of full pages from widgets
├── widgets/    # Self-contained UI blocks (Header, ProductList, CartWidget)
├── features/   # User scenarios (AddToCart, Search, Filter)
├── entities/   # Business entities (Product, Order, CartItem)
└── shared/     # Reusable code (UI-kit, API, Libs)
```
---

## 🏗️ Backend: Clean Architecture (Onion)

The solution implements **Clean Architecture (Onion Architecture)** to ensure separation of concerns, testability, and independence from frameworks.

* **🧅 Domain Layer:** The core. Contains Enterprise Logic, Entities (`Sneaker`, `Order`, `User`), and Enums. No dependencies.
* **📂 Application Layer:** Contains Business Logic, DTOs, Interfaces (`IOrderService`), and Validations. Depends only on Domain.
* **🔌 Infrastructure Layer:** Implements interfaces. Handles Database (`ApplicationDbContext`), External Services (Email), and File Systems.
* **🚀 API Layer (Presentation):** Controllers and Entry points. Depends on Application.

---

## 🛡️ Key Engineering Feature: Concurrency Control

One of the key highlights of this API is the robust handling of **overselling** during high traffic (e.g., sneaker drops).

### The Problem
In a naive implementation, if 2 users try to buy the last pair of sneakers (Stock = 1) at the exact same millisecond, both requests might read `Quantity: 1`, pass the check, and proceed to checkout, resulting in Stock becoming `-1`.

### The Solution: Optimistic Concurrency Control
We implemented **Optimistic Concurrency** using Entity Framework Core.
1.  **Versioning:** Each `ProductStock` record has a concurrency token (`Version` GUID).
2.  **Atomic Check:** When an order is placed, the system attempts to deduct stock.
3.  **Conflict Detection:** If the data was modified by another transaction between the "read" and "write" operations, a `DbUpdateConcurrencyException` is thrown.
4.  **Result:** The second transaction fails gracefully, preventing negative stock, and the user is informed that the item is out of stock.

```csharp
// Snippet from OrderService logic
public async Task<Result> CreateOrder(...) 
{
    // ... validation logic
    
    if (stockItem.Quantity < itemDto.Quantity)
        return Fail("Out of stock");

    // Deduct stock
    stockItem.Quantity -= itemDto.Quantity;
    
    // Trigger version update
    stockItem.Version = Guid.NewGuid(); 

    try {
        await _context.SaveChangesAsync();
    } catch (DbUpdateConcurrencyException) {
        // Handle race condition: Return specific error to user
        return Fail("Item was just sold out!");
    }
}
