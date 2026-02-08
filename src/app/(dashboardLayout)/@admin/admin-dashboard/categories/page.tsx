
import { getAllCategories } from "@/action/category.action";
import { CategoryList } from "@/components/layout/category-list";
import { CreateCategoryForm } from "@/components/layout/create-category-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default async function CategoriesPage() {
  const { data: categories } = await getAllCategories();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       
        <div className="lg:col-span-1">
          <CreateCategoryForm />
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>All Categories</CardTitle>
              <CardDescription>
                Manage your food categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CategoryList categories={categories || []} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}