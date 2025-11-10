import { getPostBySlug, getAllPosts } from '@/lib/posts';
import Link from 'next/link';

// 동적 라우팅을 위한 타입 정의
type Props = {
    params: Promise<{
        slug: string;
    }>;
};

// 정적 생성을 위한 경로 목록
export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function PostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {/* 상단 네비게이션 */}
            <nav className="sticky top-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b dark:border-gray-700 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-8 py-4">
                    <Link
                        href="/"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors inline-flex items-center gap-2"
                    >
                        ← 홈으로
                    </Link>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
                {/* 프로젝트 헤더 */}
                <header className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 mb-8 border dark:border-gray-700 shadow-sm">
                    <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                        <h1 className="text-3xl sm:text-4xl font-bold flex-1 dark:text-white">{post.title}</h1>
                        {post.featured && (
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-3 py-1 rounded-full font-bold">
                                ⭐ Featured
                            </span>
                        )}
                    </div>

                    <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-6">{post.description}</p>

                    {/* 메타 정보 */}
                    <div className="flex flex-wrap gap-4 items-center text-sm text-gray-600 dark:text-gray-400 mb-6">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>약 {Math.ceil(post.content.length / 500)} 분 읽기</span>
                        </div>
                    </div>

                    {/* 태그 */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* GitHub/Demo 링크 */}
                    {(post.github || post.demo) && (
                        <div className="flex flex-wrap gap-3 pt-6 border-t dark:border-gray-700">
                            {post.github && (
                                <a
                                    href={post.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-gray-900 dark:bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm sm:text-base"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                                    </svg>
                                    GitHub
                                </a>
                            )}
                            {post.demo && (
                                <a
                                    href={post.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm sm:text-base"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    Live Demo
                                </a>
                            )}
                        </div>
                    )}
                </header>

                {/* 본문 내용 */}
                <article className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm border dark:border-gray-700">
                    <div
                        className="prose prose-lg prose-gray dark:prose-invert max-w-none
                            prose-headings:font-bold
                            prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8
                            prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:pb-2 prose-h2:border-b dark:prose-h2:border-gray-700
                            prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
                            prose-p:leading-relaxed prose-p:mb-4
                            prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                            prose-strong:font-semibold
                            prose-ul:my-4 prose-ol:my-4
                            prose-li:my-2
                            prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:bg-pink-50 dark:prose-code:bg-pink-900/20 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                            prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100
                            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 dark:prose-blockquote:border-blue-400 prose-blockquote:pl-4 prose-blockquote:italic"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>

                {/* 하단 네비게이션 */}
                <div className="mt-12 pt-8 border-t dark:border-gray-700">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                    >
                        ← 다른 프로젝트 보기
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t dark:border-gray-700 bg-white dark:bg-gray-800 mt-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-8 text-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                    <p>© 2025 김경민. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}