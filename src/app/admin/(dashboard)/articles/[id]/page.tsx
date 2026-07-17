import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/fields";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { updateArticleAction } from "@/lib/actions/articles";
import { getArticleById } from "@/lib/repo/articles";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = getArticleById(id);
  if (!article) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit Article" />
      <ArticleForm
        action={updateArticleAction.bind(null, id)}
        defaultValues={article}
      />
    </div>
  );
}
