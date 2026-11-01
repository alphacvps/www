"use server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ScoredPost, SearchResult } from "@/types/search";



let cachedPosts: Omit<ScoredPost, "score">[] | null = null;

function stripMarkdown(text: string): string {
  if (!text) return "";
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/(\*\*|__|\*|_|~~)/g, "")
    .replace(/^#+\s+/gm, "")
    .replace(/^\s*>\s+/gm, "")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

/*
 * Retrieves and parses all Markdown/MDX posts from the local file system.
 * Utilizes an in-memory cache to prevent repetitive, expensive disk I/O operations
 * on subsequent searches.
 */
function getAllPosts() {
  if (cachedPosts) return cachedPosts;

  const postsDirectory = path.join(process.cwd(), "content/posts");
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);
  
  cachedPosts = fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        excerpt: data.excerpt || "",
        content: stripMarkdown(content), 
      };
    });

  return cachedPosts;
}

/*
 * Normalizes text by converting it to lowercase
 */
function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/*
 * return a buffer of 20 lenghts
 */
function getMatchSnippet(content: string, query: string, excerpt: string): string {
  const normalizedContent = normalizeText(content);
  const normalizedQuery = normalizeText(query);
  const matchIndex = normalizedContent.indexOf(normalizedQuery);

  if (matchIndex === -1) return excerpt;

  const buffer = 20; 
  const start = Math.max(0, matchIndex - buffer);
  const end = Math.min(content.length, matchIndex + query.length + buffer);

  let snippet = content.substring(start, end).trim();
  
  if (start > 0) snippet = "..." + snippet;
  if (end < content.length) snippet = snippet + "...";

  return snippet;
}

/*
 * Server action to search through blog posts based on a user query.
 * Returns the top 5 most relevant results.
 */
export async function getRecentPosts(limit: number = 4): Promise<SearchResult[]> {
  const posts = getAllPosts();
  return posts.slice(0, limit).map(({ slug, title, excerpt }) => ({
    slug,
    title,
    excerpt: excerpt || "",
  }));
}

export async function searchPosts(query: string): Promise<SearchResult[]> {
  if (!query.trim()) return [];

  const posts = getAllPosts();
  const normalizedQuery = normalizeText(query);
  const searchTerms = normalizedQuery.split(/\s+/).filter(Boolean);

  const scoredResults = posts.map((post) => {
    let score = 0;

    const normalizedTitle = normalizeText(post.title);
    const normalizedExcerpt = normalizeText(post.excerpt || "");
    const normalizedContent = normalizeText(post.content);

    if (normalizedTitle.includes(normalizedQuery)) score += 20;
    if (normalizedExcerpt.includes(normalizedQuery)) score += 10;

    searchTerms.forEach((term) => {
      if (normalizedTitle.includes(term)) score += 5;
      else if (normalizedExcerpt.includes(term)) score += 3;
      else if (normalizedContent.includes(term)) score += 1;
    });

    return { ...post, score };
  });

  const results = scoredResults
    .filter((post) => post.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ slug, title, excerpt, content }) => {
      
      const inTitle = normalizeText(title).includes(normalizedQuery);
      const inExcerpt = normalizeText(excerpt || "").includes(normalizedQuery);

      let displayExcerpt = excerpt || "";
      
      if (!inTitle && !inExcerpt) {
         displayExcerpt = getMatchSnippet(content, query, displayExcerpt);
      }

      return {
        slug,
        title,
        excerpt: displayExcerpt,
      };
    });

  return results;
}