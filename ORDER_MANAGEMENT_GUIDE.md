# Order Management System - API & Implementation Guide

## Files Created/Updated

### 1. **order.server.ts** (New - Server Actions)
Location: `src/action/order.server.ts`

Server-side only actions for order management:
- `getIncomingOrders()` - Get all incoming orders for a provider
- `getAllOrders(page?, limit?, status?)` - Get orders with pagination and filtering
- `getOrderById(orderId)` - Get a specific order
- `updateOrderStatus(orderId, status)` - Update order status
- `cancelOrder(orderId)` - Cancel an order

### 2. **order.action.ts** (Updated)
Location: `src/action/order.action.ts`

Existing functions preserved:
- `postOrder(data)` - Create a new order
- `getOrder()` - Get all orders for current user

New functions added:
- `getIncomingOrders()` - For providers
- `getAllOrders(page?, limit?, status?)` - For filtering
- `getOrderById(orderId)` - Get single order
- `updateOrderStatus(orderId, status)` - Update status
- `cancelOrder(orderId)` - Cancel order

### 3. **order.service.ts** (Updated)
Location: `src/services/order.service.ts`

Existing methods preserved:
- `postOrder()` - Creates order via POST /orders
- `getAllOrder()` - Gets all orders via GET /orders

New API methods added:
- `getIncomingOrders()` - GET `/orders/incoming`
- `getAllOrders(page?, limit?, status?)` - GET `/orders?page=&limit=&status=`
- `getOrderById(orderId)` - GET `/orders/:orderId`
- `updateOrderStatus(orderId, status)` - PATCH `/orders/:orderId/status`
- `cancelOrder(orderId)` - DELETE `/orders/:orderId`

### 4. **order-management-card.tsx** (New - Component)
Location: `src/components/layout/order-management-card.tsx`

UI Component for displaying individual orders with:
- Order details (ID, Status, Total, Date)
- Customer information
- Delivery address
- Order items with quantities and prices
- Status dropdown with all status options
- Cancel order button
- Real-time toast notifications

### 5. **Provider Orders Dashboard Page** (Updated)
Location: `src/app/(dashboardLayout)/@provider/provider-dashboard/orders/page.tsx`

Full-featured orders management page with:
- **Auto-loading**: Loads incoming orders on component mount
- **Status filtering**: Filter by pending, processing, ready, delivered, cancelled
- **Search functionality**: Search by Order ID, Address, Customer Name, or Email
- **Refresh button**: Manually reload orders
- **Status counters**: Shows count of orders per status
- **Order management**: Update status or cancel orders directly
- **Real-time updates**: Auto-refreshes when status changes

## API Endpoints Expected (Backend)

The following endpoints should be implemented on your backend:

### User Orders (Existing)
- `POST /orders` - Create new order
- `GET /orders` - Get user's orders

### Provider Orders (New)
- `GET /orders/incoming` - Get orders for current provider's meals
- `PATCH /orders/:orderId/status` - Update order status
  - Body: `{ status: "pending|processing|ready|delivered|cancelled" }`
- `DELETE /orders/:orderId` - Cancel an order

### Admin Orders (Existing)
- `GET /orders` - Get all orders (with filters)
- `GET /orders/:orderId` - Get specific order

## Order Status Flow

```
pending -> processing -> ready -> delivered
   |
   └----> cancelled (can be from any status)
```

## Usage Examples

### Provider Dashboard - View and Manage Orders
```typescript
// Provider can see all incoming orders for their meals
const result = await getIncomingOrders();

// Update order status
const result = await updateOrderStatus(orderId, "ready");

// Cancel an order
const result = await cancelOrder(orderId);
```

### User Dashboard - View My Orders
```typescript
// Already works through existing getOrder() action
const result = await getOrder();
```

### Admin Dashboard - View All Orders
```typescript
// Already works through existing OrdersTable component
const result = await getOrder();
```

## Features

✅ Server-side data fetching
✅ Real-time status updates
✅ Search and filter functionality
✅ Order cancellation
✅ Customer information display
✅ Responsive design
✅ Toast notifications for user feedback
✅ Type-safe with TypeScript

## Notes

- All actions use "use server" directive for secure server-side execution
- Cookie authentication is maintained for secured API calls
- Error handling with user-friendly error messages
- Loading states for better UX
- Refreshable orders list
