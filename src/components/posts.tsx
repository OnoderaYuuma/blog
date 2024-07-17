import { Post } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
    posts: Post[]
}

const Posts: FC<Props> = ({posts}) => {
    return (
        <div className="flex justify-center items-center py-8">
            <div className="container grid grid-cols-2 gap-6 lg:gap-14 max-w-5xl px-4">
                {posts.map(({title, slug, eyecatch}) =>(
                    <article key={slug}>
                        <Link href={`/blog/${slug}`}>
                            <figure>
                                <Image src={eyecatch ? `https://atmftxmvnbucqwzycpwg.supabase.co/storage/v1/object/public/thumbnails/${eyecatch}`: "/images/eyecatch.jpg"} alt="" width={576} height={288} className="w-full" />
                            </figure>
                            <h2 className="text-2xl font-normal">{title}</h2>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
 
export default Posts;