import { AdminPageHeader } from "@/components/admin/fields";
import { MediaLibrary } from "@/components/admin/MediaLibrary";
import { listMedia } from "@/lib/repo/media";

export default function AdminMediaPage() {
  const items = listMedia();

  return (
    <div>
      <AdminPageHeader
        title="Media Library"
        description="Upload images, videos, and PDFs. Reuse them across projects, clients, and articles."
      />
      <MediaLibrary initialMedia={items} />
    </div>
  );
}
