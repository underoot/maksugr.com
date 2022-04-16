import cn from 'classnames';
import { FC } from 'react';

import { EXAMPLE_PATH } from '../lib/constants';

import { Container } from './container';

interface IAlertProps {
    readonly preview?: boolean;
}

export const Alert: FC<IAlertProps> = ({ preview }) => {
    return (
        <div
            className={cn('border-b', {
                'bg-neutral-800 border-neutral-800 text-white': preview,
                'bg-neutral-50 border-neutral-200': !preview
            })}
        >
            <Container>
                <div className='py-2 text-center text-sm'>
                    {preview ? (
                        <>
                            This page is a preview.{' '}
                            <a
                                href='/api/exit-preview'
                                className='underline hover:text-teal-300 duration-200 transition-colors'
                            >
                                Click here
                            </a>{' '}
                            to exit preview mode.
                        </>
                    ) : (
                        <>
                            The source code for this blog is{' '}
                            <a
                                href={`https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
                                className='underline hover:text-blue-600 duration-200 transition-colors'
                            >
                                available on GitHub
                            </a>
                            .
                        </>
                    )}
                </div>
            </Container>
        </div>
    );
};