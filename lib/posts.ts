import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// posts 폴더 경로
const postsDirectory = path.join(process.cwd(), 'posts');

// 포스트 타입 정의
export interface Post {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
    content: string;
    thumbnail?: string;
    github?: string;
    demo?: string;
    featured?: boolean;
}

// 모든 포스트 목록 가져오기 (메타데이터만)
export function getAllPosts(): Omit<Post, 'content'>[] {
    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data } = matter(fileContents);

            return {
                slug,
                title: data.title,
                description: data.description,
                date: data.date,
                tags: data.tags || [],
                thumbnail: data.thumbnail,
                github: data.github,
                demo: data.demo,
                featured: data.featured,
            };
        });

    // 날짜순 정렬 (최신순)
    return allPostsData.sort((a, b) => (a.date > b.date ? -1 : 1));
}

// 특정 포스트 상세 내용 가져오기
export function getPostBySlug(slug: string): Post {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Markdown을 HTML로 변환
    const htmlContent = marked(content) as string;

    return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags || [],
        content: htmlContent,
        thumbnail: data.thumbnail,
        github: data.github,
        demo: data.demo,
        featured: data.featured,
    };
}

// 모든 포스트의 slug 가져오기 (동적 라우팅용)
export function getAllPostSlugs() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => ({
            params: {
                slug: fileName.replace(/\.md$/, ''),
            },
        }));
}