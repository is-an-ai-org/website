import { useEffect, useState } from "react";
import { getAllBlogPosts, formatDate, type BlogPost } from "@/lib/blog";
import SEO from "@/components/SEO";
import { BlueprintCard } from "@/components/blueprint";
import { RssIcon } from "lucide-react";

export default function BlogIndex() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const blogPosts = await getAllBlogPosts();
        setPosts(blogPosts);
      } catch (error) {
        console.error("Failed to load blog posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (isLoading) {
    return (
      <>
        <SEO
          title="Blog - Loading..."
          description="Learn how to make the most of your AI project subdomains with is-an.ai"
          url="/blog"
        />
        <div className="min-h-screen bg-bp-bg bp-paper py-12">
          <div className="max-w-4xl mx-auto px-4 text-bp-inkSoft">
            <span className="bp-cursor inline-block h-4 mr-1" />
            loading posts...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Blog"
        description="Learn how to make the most of your AI project subdomains with is-an.ai. Tutorials, tips, and best practices for AI developers and researchers."
        keywords={[
          "AI subdomain",
          "machine learning",
          "AI projects",
          "subdomain registration",
          "AI development",
          "tutorials",
          "is-an.ai",
        ]}
        url="/blog"
        type="website"
      />
      <div className="min-h-screen bg-bp-bg bp-paper py-12">
        <div className="max-w-4xl mx-auto px-4">
          <header className="mb-10">
            <span className="bp-tape">SHEET A-300 · LOG ENTRIES</span>
            <div className="flex items-end justify-between mt-4 gap-4 flex-wrap">
              <div>
                <h1 className="font-bold text-bp-ink tracking-tight text-3xl sm:text-4xl">
                  is-an.ai blog
                </h1>
                <p className="text-bp-inkSoft text-base mt-2">
                  Learn how to make the most of your AI project subdomains
                </p>
              </div>
              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="bp-btn bp-btn-accent font-bold"
                style={{ fontSize: 14 }}
                title="Subscribe to RSS feed"
              >
                <RssIcon className="w-4 h-4" />
                RSS feed
              </a>
            </div>
          </header>

          <div className="space-y-6">
            {posts.map((post, idx) => (
              <BlueprintCard
                key={post.slug}
                className="p-5 sm:p-6 hover:bg-white transition-colors group"
                noSnapCorners
              >
                <div className="flex items-center justify-between font-mono text-[10px] tracking-tape text-bp-inkSoft mb-2">
                  <span>ENTRY #{String(idx + 1).padStart(3, "0")}</span>
                  <time dateTime={post.date}>
                    {formatDate(post.date).toUpperCase()}
                  </time>
                </div>

                <h2 className="font-semibold text-bp-ink text-xl sm:text-2xl leading-snug mb-2 tracking-tight">
                  <a
                    href={`/blog/${post.slug}`}
                    className="hover:text-bp-accent transition-colors"
                  >
                    {post.title}
                  </a>
                </h2>

                <p className="text-bp-ink text-base leading-snug mb-4">
                  {post.description}
                </p>

                <div className="flex items-center justify-between border-t border-dashed border-bp-ink/40 pt-3 gap-3 flex-wrap">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="bp-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] tracking-tape text-bp-inkSoft">
                      {post.author.toUpperCase()}
                    </span>
                    <a
                      href={`/blog/${post.slug}`}
                      className="font-bold text-bp-accent hover:underline"
                    >
                      read more →
                    </a>
                  </div>
                </div>
              </BlueprintCard>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12 text-bp-inkSoft text-lg">
              No blog posts yet. Stay tuned for updates ✎
            </div>
          )}
        </div>
      </div>
    </>
  );
}
