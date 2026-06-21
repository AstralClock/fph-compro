export const dynamicParams = false;
import { getProjectBySlug, getStrapiMedia } from "@/lib/api"; // <-- Pastikan di file api.ts ini ada fungsi buat ambil ALL projects, contoh: getAllProjects
import { notFound } from "next/navigation";
import Link from "next/link";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

// ==========================================
// 1. TAMBAHKAN FUNGSI INI DI ATAS ATAU DI BAWAH
// ==========================================
export async function generateStaticParams() {
    try {
        // Tambahkan opsi timeout atau headers jika Strapi membutuhkan token API
        const res = await fetch("http://127.0.0.1:1337/api/projects", {
            headers: {
                'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN || ''}` // masukkan token jika API Strapi diproteksi
            }
        });
        
        if (!res.ok) {
            console.error("Strapi returned error status:", res.status);
            return []; // Kembalikan array kosong agar build tidak crash
        }

        const response = await res.json();
        const data = response.data;

        if (!data || !Array.isArray(data)) {
            return [];
        }

        // Mapping yang aman untuk mendeteksi struktur Strapi v4 maupun v5
        return data.map((project: any) => {
            const slugValue = project.slug || project.attributes?.slug;
            return {
                slug: String(slugValue),
            };
        }).filter((item) => item.slug && item.slug !== 'undefined'); // Buang data yang tidak valid
        
    } catch (error) {
        console.error("Failed to fetch data from Strapi during build:", error);
        return []; // Wajib return array kosong jika catch error agar build tetap lanjut
    }
}
// 2. Ini komponen utama kamu yang sudah ada (tidak ada yang diubah)
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
