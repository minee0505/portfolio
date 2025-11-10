import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
    const posts = getAllPosts();

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {/* Hero Section */}
            <section className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        김경민
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-4">
                        Backend & Frontend Developer
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-sm sm:text-base">
                        풀스택 개발자로서 사용자 중심의 서비스를 만들고 있습니다.
                        AI 통합, 실시간 통신, 인프라 구축까지 다양한 기술 스택을 활용하여
                        문제를 해결하는 것을 즐깁니다.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-6">
                        <a
                            href="https://github.com/minee0505"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors text-sm sm:text-base"
                        >
                            GitHub →
                        </a>
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=wodeyue97@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors text-sm sm:text-base"
                        >
                            Email →
                        </a>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 dark:text-white">프로젝트</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/posts/${post.slug}`}
                            className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
                        >
                            {/* 썸네일 영역 */}
                            <div className="h-40 sm:h-48 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                                <span className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 opacity-20">
                                    {post.title.substring(0, 2)}
                                </span>
                            </div>

                            <div className="p-4 sm:p-6">
                                <h3 className="font-bold text-xl sm:text-2xl mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors dark:text-white">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm sm:text-base">
                                    {post.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {post.tags.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 sm:px-3 py-1 rounded-full font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    {post.tags.length > 3 && (
                                        <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                                            +{post.tags.length - 3}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center justify-between text-xs sm:text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">{post.date}</span>
                                    <span className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                                        자세히 보기 →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t dark:border-gray-700 bg-white dark:bg-gray-800 mt-12 sm:mt-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-8 text-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                    <p>© 2025 김경민. All rights reserved.</p>
                    <p className="mt-2">kyoungmin.com</p>
                </div>
            </footer>
        </main>
    );
}