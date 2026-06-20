import React from 'react';

export default function BlogSidebar({ categories = [], activeTab, onTabChange }) {
    return (
        <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-stack-md bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
                <h3 className="font-label-lg text-label-lg text-primary uppercase tracking-wider mb-2 pb-2 border-b border-outline-variant">
                    Danh Mục Tin Tức
                </h3>
                <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => onTabChange(cat)}
                            className={`px-4 py-2 text-left text-body-md rounded-lg transition-all whitespace-nowrap w-full text-left ${activeTab === cat
                                    ? "bg-primary-container text-on-primary-container font-bold"
                                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </nav>
            </div>
        </aside>
    );
}