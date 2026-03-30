import { getMyOrder } from "@/action/order.action";
import { OrderCard } from "@/components/layout/orderCard";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const dynamic = "force-dynamic";

const UserOrderPage = async () => {
  const { data: orders } = await getMyOrder();
  const orderList = orders?.data || [];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <ScrollReveal direction="down">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      </ScrollReveal>

      {!orderList || orderList.length === 0 ? (
        <ScrollReveal direction="up">
          <Card className="p-6">
            <p className="text-center text-muted-foreground">No orders found</p>
          </Card>
        </ScrollReveal>
      ) : (
        <div className="space-y-4">
          {orderList.map((order: any, index: number) => (
            <ScrollReveal direction="left" delay={index * 0.1} key={order.id}>
              <OrderCard order={order} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrderPage;
