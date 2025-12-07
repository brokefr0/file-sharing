import React from 'react';
import Link from 'next/link';

function Hero() {
    return (
        <section className="bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-[calc(100vh-64px)] lg:items-center">
                <div className="mx-auto max-w-3xl text-center">

                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                        Upload, Save and Share
                        <span className="mt-2 block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                            Without Limits
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        Built by students, for everyone. The simplest way to share your projects,
                        assignments, and ideas securely in one place.
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Link
                            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition duration-200 hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            href="/upload"
                        >
                            Start Uploading
                            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>

                        <Link
                            className="inline-flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-8 py-3 text-sm font-semibold text-gray-900 dark:text-white shadow-sm transition duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
                            href="/files"
                        >
                            View Files
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
