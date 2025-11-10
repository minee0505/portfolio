export default function Home() {
    return (
        <main className="min-h-screen p-8 bg-white">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">경민's 개발 블로그</h1>
                <p className="text-gray-600 mb-8">
                    개발자 포트폴리오 블로그입니다.
                </p>

                <section>
                    <h2 className="text-2xl font-bold mb-4">프로젝트</h2>
                    <div className="space-y-4">
                        <div className="border p-4 rounded">
                            <h3 className="font-bold">반띵</h3>
                            <p className="text-gray-600">프로젝트 설명 예정</p>
                        </div>
                        <div className="border p-4 rounded">
                            <h3 className="font-bold">다이얼로짐</h3>
                            <p className="text-gray-600">프로젝트 설명 예정</p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}