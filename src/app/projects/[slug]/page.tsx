import { getProjectBySlug, getStrapiMedia } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { data: project } = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const coverUrl = project.coverImage ? getStrapiMedia(project.coverImage.url) : null;

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Navigation */}
        <Link 
          href="/#projects" 
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>

        {/* Content Container */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {project.title}
            </h1>
            {project.summary && (
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {project.summary}
              </p>
            )}
          </header>

          {/* Cover Image constrained to article width */}
          {coverUrl && (
            <div className="w-full h-64 md:h-[450px] relative rounded-2xl overflow-hidden mb-12 bg-muted/10 border border-border/50 shadow-sm">
              <Image 
                src={coverUrl} 
                alt={project.title} 
                fill
                className="object-contain p-4 md:p-8"
                priority
                unoptimized
              />
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl max-w-none text-muted-foreground prose-strong:text-foreground">
            {project.content ? (
              <BlocksRenderer content={project.content} />
            ) : (
              <p>No content available.</p>
            )}
          </div>
        </article>
      </div>
    </main>
  );
}
