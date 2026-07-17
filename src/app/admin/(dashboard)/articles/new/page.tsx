import { AdminPageHeader } from "@/components/admin/fields";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { createArticleAction } from "@/lib/actions/articles";

export default function NewArticlePage() {
  return (
    <div>
      <AdminPageHeader title="Add Article" />
      <ArticleForm action={createArticleAction} />
    </div>
  );
}
