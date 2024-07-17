export type Post = {
    slug: string;
    title: string;
    body:string;
    eyecatch: string;
    create_at: number;
};

export type Category = {
    id: number;
    name: string;
};