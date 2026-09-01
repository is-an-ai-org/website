/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogPost, formatDate, type BlogPost } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SEO from "@/components/SEO";
import { BlueprintCard } from "@/components/blueprint";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      try {
        const blogPost = await getBlogPost(slug);
        if (blogPost) {
          setPost(blogPost);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Failed to load blog post:", error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (isLoading) {
    return (
      <>
        <SEO
          title="Loading Blog Post..."
          description="Loading blog post content..."
          url={`/blog/${slug}`}
        />
        <div className="min-h-screen bg-bp-bg bp-paper py-12">
          <div className="max-w-4xl mx-auto px-4 text-bp-inkSoft">
            <span className="bp-cursor inline-block h-4 mr-1" />
            loading post...
          </div>
        </div>
      </>
    );
  }

  if (notFound || !post) {
    return (
      <>
        <SEO
          title="Blog Post Not Found"
          description="The blog post you're looking for doesn't exist."
          url={`/blog/${slug}`}
        />
        <div className="min-h-screen bg-bp-bg bp-paper py-12">
          <div className="max-w-4xl mx-auto px-4 text-center py-12">
            <span className="font-mono text-[10px] tracking-tape text-bp-accent border border-bp-accent px-2 py-0.5">
              ✕ 404
            </span>
            <h1 className="font-bold text-bp-ink text-3xl tracking-tight mt-4">
              Post not found.
            </h1>
            <p className="text-bp-inkSoft mt-3">
              The blog post you're looking for doesn't exist.
            </p>
            <Link
              to="/blog"
              className="font-bold text-bp-accent hover:underline mt-6 inline-block"
            >
              ← back to blog
            </Link>
          </div>
        </div>
      </>
    );
  }

  const publishedTime = new Date(post.date).toISOString();

  return (
    <>
      <SEO
        title={post.title}
        description={post.description}
        keywords={[
          "AI subdomain",
          "machine learning",
          "AI projects",
          ...post.tags,
        ]}
        url={`/blog/${post.slug}`}
        type="article"
        publishedTime={publishedTime}
        author={post.author}
        tags={post.tags}
      />
      <div className="min-h-screen bg-bp-bg bp-paper py-12">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="mb-6">
            <Link
              to="/blog"
              className="font-bold text-bp-accent hover:underline"
            >
              ← back to blog
            </Link>
          </nav>

          <BlueprintCard className="p-6 sm:p-10" bg="bg-white/85" noSnapCorners>
            <header className="mb-8 pb-6 border-b border-dashed border-bp-ink/40">
              <div className="flex flex-wrap items-center gap-3 mb-4 font-mono text-[10px] tracking-tape text-bp-inkSoft">
                <time dateTime={post.date}>
                  {formatDate(post.date).toUpperCase()}
                </time>
                <span>·</span>
                <span>{post.author.toUpperCase()}</span>
              </div>

              <h1 className="font-bold text-bp-ink text-3xl sm:text-4xl leading-tight tracking-tight mb-3">
                {post.title}
              </h1>

              <p className="text-bp-ink text-lg leading-snug mb-5">
                {post.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="bp-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <div className="max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: (props: any) => (
                    <h2
                      className="font-bold text-bp-ink text-2xl tracking-tight mt-10 mb-4 first:mt-0"
                      {...props}
                    />
                  ),
                  h2: (props: any) => (
                    <h2
                      className="font-bold text-bp-ink text-xl tracking-tight mt-8 mb-3"
                      {...props}
                    />
                  ),
                  h3: (props: any) => (
                    <h3
                      className="font-semibold text-bp-ink text-lg tracking-tight mt-6 mb-2"
                      {...props}
                    />
                  ),
                  p: (props: any) => (
                    <p
                      className="text-bp-ink text-base leading-relaxed mb-4"
                      {...props}
                    />
                  ),
                  ul: (props: any) => (
                    <ul
                      className="list-disc list-outside ml-5 mb-4 text-bp-ink space-y-1"
                      {...props}
                    />
                  ),
                  ol: (props: any) => (
                    <ol
                      className="list-decimal list-outside ml-5 mb-4 text-bp-ink space-y-1"
                      {...props}
                    />
                  ),
                  li: (props: any) => (
                    <li className="leading-relaxed" {...props} />
                  ),
                  blockquote: (props: any) => (
                    <blockquote
                      className="border-l-2 border-bp-accent pl-4 my-6 italic text-bp-inkSoft"
                      {...props}
                    />
                  ),
                  code: (props: any) => (
                    <code
                      className="bg-bp-paper border border-bp-ink/30 px-1.5 py-0.5 text-sm font-mono text-bp-accent"
                      {...props}
                    />
                  ),
                  pre: (props: any) => (
                    <pre
                      className="bg-bp-graphite text-bp-paper border-2 border-bp-ink p-4 overflow-x-auto mb-6 text-sm font-mono"
                      {...props}
                    />
                  ),
                  a: (props: any) => (
                    <a
                      {...props}
                      className="text-bp-accent underline decoration-2 underline-offset-2 hover:no-underline"
                      target={
                        props.href?.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        props.href?.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    />
                  ),
                  strong: (props: any) => (
                    <strong className="font-bold text-bp-ink" {...props} />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </BlueprintCard>

          <div className="mt-8 text-center">
            <Link
              to="/blog"
              className="font-bold text-bp-accent hover:underline"
            >
              ← back to blog
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
