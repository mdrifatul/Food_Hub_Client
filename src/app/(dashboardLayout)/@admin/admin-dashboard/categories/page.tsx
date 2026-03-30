import { getAllCategories } from "@/action/category.action";
import { CategoryList } from "@/components/layout/category-list";
import { CreateCategoryForm } from "@/components/layout/create-category-form";
import { Layers } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const { data: categories } = await getAllCategories();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Premium Header */}
      <ScrollReveal direction="down" className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Layers className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Menu Categories
            </h1>
          </div>
          <p className="text-muted-foreground ml-11">
            Organize and manage your restaurant's menu structure.
          </p>
        </div>

        {/* Quick summary badge */}
        <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full border border-border/50">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium">
            {categories?.length || 0} Active Categories
          </span>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column - Sticky */}
        <ScrollReveal direction="left" delay={0.1} className="lg:col-span-4 lg:sticky lg:top-6">
          <CreateCategoryForm />
        </ScrollReveal>

        {/* Table Column */}
        <ScrollReveal direction="right" delay={0.2} className="lg:col-span-8">
          <CategoryList categories={categories || []} />
        </ScrollReveal>
      </div>
    </div>
  );
}
