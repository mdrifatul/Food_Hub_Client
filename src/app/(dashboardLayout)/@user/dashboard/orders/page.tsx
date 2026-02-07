import { getOrder } from "@/action/order.action";
import { Card } from "@/components/ui/card";

const UserOrderPage = async () => {
  const { data: orders, error } = await getOrder();

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">My Orders</h1>
        <p className="text-red-500">Error loading orders: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {!orders || orders.length === 0 ? (
        <Card className="p-6">
          <p className="text-center text-gray-600">No orders found</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <Card key={order.id} className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-semibold">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-semibold capitalize">{order.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Price</p>
                  <p className="font-semibold">
                    ${order.totalPrice?.toFixed(2) || "0.00"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2">Delivery Address</p>
                <p className="font-semibold">{order.deliveryAddress}</p>
              </div>
              {order.items && order.items.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-semibold mb-2">Items</p>
                  <ul className="space-y-1">
                    {order.items.map((item: any, idx: number) => (
                      <li key={idx} className="text-sm text-gray-600">
                        {item.mealId} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrderPage;
