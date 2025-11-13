import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getArticleBySlug, getLatestArticles, articles } from "@/lib/news-data"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowLeft } from "lucide-react"
import { TransitionLink } from "@/components/gsap/TransitionLink"

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  
  if (!article) {
    return {
      title: "Article non trouvé",
    }
  }

  return {
    title: `${article.title} | Château Lastours`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : [],
    },
  }
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  
  if (!article) return notFound()

  const latest = getLatestArticles(3).filter((a) => a.slug !== article.slug)

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero avec image */}
        <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
          {article.image && (
            <div className="absolute inset-0">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
            </div>
          )}
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light mb-6 tracking-[0.02em] leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              {article.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contenu principal */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Bouton retour */}
            <div className="mb-8">
              <TransitionLink
                href="/actualites"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour aux actualités
              </TransitionLink>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Article principal */}
              <article className="lg:col-span-2 space-y-8">
                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Contenu */}
                <div className="prose prose-lg max-w-none">
                  <div className="space-y-6">
                    {article.body.map((paragraph, i) => (
                      <p
                        key={i}
                        className="text-lg md:text-xl leading-relaxed text-slate-700 font-light"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="space-y-8">
                {/* Derniers articles */}
                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="text-xl font-serif font-light mb-4 text-slate-900">
                    Derniers articles
                  </h3>
                  <ul className="space-y-4">
                    {latest.map((post) => (
                      <li key={post.slug}>
                        <Link
                          href={`/actualites/${post.slug}`}
                          className="group block"
                        >
                          {post.image && (
                            <div className="relative aspect-[4/3] mb-3 rounded-lg overflow-hidden">
                              <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                            </div>
                          )}
                          <h4 className="text-base font-medium text-slate-900 group-hover:text-wine-gold transition-colors leading-tight mb-1">
                            {post.title}
                          </h4>
                          <time
                            dateTime={post.date}
                            className="text-sm text-slate-500"
                          >
                            {new Date(post.date).toLocaleDateString("fr-FR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="bg-slate-900 text-white rounded-lg p-6">
                  <h3 className="text-xl font-serif font-light mb-4">
                    Restez informé
                  </h3>
                  <p className="text-slate-300 mb-4 font-light">
                    Recevez nos dernières actualités directement dans votre boîte mail.
                  </p>
                  <TransitionLink
                    href="/actualites#newsletter"
                    className="inline-block px-6 py-3 bg-white text-slate-900 font-medium rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    S'abonner à la newsletter
                  </TransitionLink>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

