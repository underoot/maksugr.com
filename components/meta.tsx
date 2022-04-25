import Head from 'next/head';
import { FC } from 'react';

import { DEFAULT_TITLE } from '../lib/constants';

export const Meta: FC = () => {
    return (
        <Head>
            <link
                rel='apple-touch-icon'
                sizes='180x180'
                href='/favicon/apple-touch-icon.png'
            />
            <link
                rel='icon'
                type='image/png'
                sizes='32x32'
                href='/favicon/favicon-32x32.png'
            />
            <link
                rel='icon'
                type='image/png'
                sizes='16x16'
                href='/favicon/favicon-16x16.png'
            />
            <link rel='manifest' href='/favicon/site.webmanifest' />
            <link
                rel='mask-icon'
                href='/favicon/safari-pinned-tab.svg'
                color='#000000'
            />
            <link rel='shortcut icon' href='/favicon/favicon.ico' />
            <meta name='msapplication-TileColor' content='#000000' />
            <meta
                name='msapplication-config'
                content='/favicon/browserconfig.xml'
            />
            <meta name='theme-color' content='#000' />
            <meta name='description' content={`${DEFAULT_TITLE}`} />
            <meta property='og:image' content='/og/image.png' />
            <link
                rel='alternate'
                type='application/rss+xml'
                title='Roman Ponomarev RSS feed'
                href='/feeds/feed.xml'
            />
            <link
                rel='alternate'
                type='application/atom+xml'
                title='Roman Ponomarev Atom feed'
                href='/feeds/atom.xml'
            />
            <link
                rel='alternate'
                type='application/feed+json'
                title='Roman Ponomarev JSON feed'
                href='/feeds/feed.json'
            />
        </Head>
    );
};
