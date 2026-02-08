import { getOrder } from "@/action/order.action";
import { OrdersTable } from "@/components/layout/OrdersTable";

const AllOrders = async () => {
  const { data: orders } = await getOrder();
  
  const orderList = orders?.data || []
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          All Orders
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Total Orders: {orders?.length || 0}
        </p>
      </div>

      <OrdersTable orders={orderList} />
    </div>
  );
};

export default AllOrders;  