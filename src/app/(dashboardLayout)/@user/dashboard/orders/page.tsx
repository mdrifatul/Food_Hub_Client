import { getMyOrder } from "@/action/order.action";
import { OrderCard } from "@/components/layout/orderCard";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

const UserOrderPage = async () => {
  const { data: orders } = await getMyOrder();
  console.log(orders);
  const orderList = orders?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {!orderList || orderList.length === 0 ? (
        <Card className="p-6">
          <p className="text-center text-gray-600">No orders found</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {orderList.map((order: any) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrderPage;
