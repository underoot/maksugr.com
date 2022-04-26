import fs from 'fs';

import { Feed, Item } from 'feed';
import ReactDOMServer from 'react-dom/server';
import { parseISO } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote';
import { stripHtml } from 'string-strip-html';

import { MDXComponents } from '../components/mdx-components';
import { IPost } from '../interfaces/post';

import {
    AUTHOR_EMAIL,
    AUTHOR_NAME,
    BASE_URL,
    COPYRIGHT,
    DEFAULT_DESCRIPTION,
    DEFAULT_TITLE
} from './constants';
import { getPosts } from './posts';

const buildFeed = (): Feed => {
    return new Feed({
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        id: BASE_URL,
        link: BASE_URL,
        language: 'en',
        image: `${BASE_URL}/og/image.png`,
        favicon: `${BASE_URL}/favicons/favicon.ico`,
        copyright: COPYRIGHT,
        generator: 'NextJS + feed package',
        feedLinks: {
            json: `${BASE_URL}/feeds/feed.json`,
            atom: `${BASE_URL}/feeds/atom.xml`,
            rss2: `${BASE_URL}/feeds/feed.xml`
        },
        author: {
            name: AUTHOR_NAME,
            email: AUTHOR_EMAIL,
            link: BASE_URL
        }
    });
};

const makeFeedItem = (post: IPost): Item => {
    const url = `${BASE_URL}/notes/${post.metadata.slug}`;

    const htmlContent = ReactDOMServer.renderToStaticMarkup(
        <MDXRemote {...post.mdxSource} components={MDXComponents} />
    )
        .replace(/href="\/#/g, `href="${url}#`)
        .replace(/href="\//g, `href="${BASE_URL}/`)
        .replace(/src="\//g, `src="${BASE_URL}/`);

    const cleanHtmlContent = stripHtml(htmlContent, {
        onlyStripTags: ['script', 'style'],
        stripTogetherWithTheirContents: ['script', 'style']
    }).result;

    return {
        title: post.metadata.title,
        id: url,
        link: url,
        description: post.metadata.summary,
        date: parseISO(post.metadata.publishedAt),
        content: cleanHtmlContent
    };
};

export const generateMainFeeds = async (): Promise<void> => {
    const feed = buildFeed();
    const posts = await getPosts('notes');

    posts.forEach((post) => feed.addItem(makeFeedItem(post)));

    fs.mkdirSync('public/feeds/', { recursive: true });

    fs.writeFileSync('public/feeds/feed.xml', feed.rss2());
    fs.writeFileSync('public/feeds/feed.json', feed.json1());
    fs.writeFileSync('public/feeds/atom.xml', feed.atom1());
};

export default buildFeed;