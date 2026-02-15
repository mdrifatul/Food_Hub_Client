import { getOrder } from "@/action/order.action";
import { OrdersTable } from "@/components/layout/OrdersTable";

export const dynamic = "force-dynamic";

const AllOrders = async () => {
  const { data: orders, error } = await getOrder();
  const orderList = Array.isArray(orders) ? orders : [];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          All Orders
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Total Orders: {orderList.length || 0}
        </p>
      </div>

      <OrdersTable orders={orderList} />
    </div>
  );
};

export default AllOrders;
