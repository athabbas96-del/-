import Link from "next/link";
import { Plus } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { buttonVariants } from "@/components/ui/button-variants";
import { AdminPageHeader, EmptyState } from "@/components/admin/fields";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { listArticles } from "@/lib/repo/articles";
import { deleteArticleAction } from "@/lib/actions/articles";

export default function AdminArticlesPage() {
  const articles = listArticles();

  return (
    <div>
      <AdminPageHeader
        title="Articles"
        description="Blog posts shown on the public Articles page."
        action={
          <Link
            href="/admin/articles/new"
            className={buttonVariants({ variant: "accent" })}
          >
            <Icon icon={Plus} size="sm" />
            Add Article
          </Link>
        }
      />

      {articles.length === 0 ? (
        <EmptyState label="No articles yet." />
      ) : (
        <div className="border-border bg-surface overflow-hidden rounded-[var(--radius-md)] border">
          {articles.map((article) => (
            <div
              key={article.id}
              className="border-border flex items-center gap-4 border-b p-4 last:border-b-0"
            >
              <div className="min-w-0 flex-1">
                <p className="text-foreground truncate text-sm font-medium">
                  {article.title}
                </p>
                <p className="text-muted truncate text-xs">
                  {article.published ? "Published" : "Draft"}
                  {article.publishedAt &&
                    ` · ${new Date(article.publishedAt).toLocaleDateString()}`}
                </p>
              </div>
              {article.published && (
                <Link
                  href={`/articles/${article.slug}`}
                  target="_blank"
                  className="text-muted text-xs hover:underline"
                >
                  View
                </Link>
              )}
              <Link
                href={`/admin/articles/${article.id}`}
                className="text-accent text-xs hover:underline"
              >
                Edit
              </Link>
              <DeleteButton
                action={deleteArticleAction.bind(null, article.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
