import Eyecatch from "@/components/eyecatch";
import Layout from "@/components/layout";
import Pagenation from "@/components/pagenation";
import PostCategory from "@/components/post-category";
import PostHeader from "@/components/post-header";
import TwoColumnLayout from "@/components/two-column-layout";
import { Post } from "@/types/blog";
import { selectPost } from "@/utils/supbase";
import { useRouter } from "next/router";
import { ClassAttributes, HTMLAttributes, useEffect, useState } from "react";
import ReactMarkdown, { ExtraProps } from "react-markdown";
import remarkGfm from "remark-gfm";


type HeadingProps = ClassAttributes<HTMLHeadingElement> &
  HTMLAttributes<HTMLHeadingElement> &
  ExtraProps;
// h1タグのスタイル定義
const H1 = ({ children }: HeadingProps) => {
  return <h1 className="text-blue-500 text-3xl border-l-2 m-l-2">{children}</h1>;
};

type ParagraphProps = ClassAttributes<HTMLParagraphElement> &
  HTMLAttributes<HTMLParagraphElement> & ExtraProps;

const P = ({children}: ParagraphProps) =>{
    return <p className="text-base">{children}</p>
}

const DetailPage = () => {
    const [post, setPost] = useState<Post>();
    const [blogId, setBlogId] = useState<string>("");
    const router = useRouter();

    useEffect(()=>{
        // クエリパラメータを取得する
        const slug = router.query.slug;
        // console.log(slug);
        if(typeof slug === "string"){
            setBlogId(slug);
        }
        
    }, [router.query]);

    useEffect(() => {
        // blogIdが空白の時には何もしない
        if (blogId === "") {
          return;
        }
        const fetchPost = async () => {
          // 記事データを取得する
          const data = await selectPost(blogId);
          // 記事データが取得できない時は処理を終了する
          if (!data) {
            return;
          }
          // blogIdが存在する時にはpostの状態を更新する
          setPost(data);
        };
        fetchPost();
      }, [blogId]);


    return (
        <Layout>
            <article className="flex flex-col items-center">{post && <PostHeader post={post} />}</article>

            {post ? (
                <Eyecatch
                    src={`https://atmftxmvnbucqwzycpwg.supabase.co/storage/v1/object/public/thumbnails/${post.eyecatch}`}
                    width={568}
                    height={288}
                />
            ) : (
                <Eyecatch src="/images/eyecatch.jpg" width={568} height={288} />
            )}
            <TwoColumnLayout>
                <div className="flex flex-col flex-1 text-base leading-8">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{h1: H1,}}>
                    {post && post.body}
                    </ReactMarkdown>
                </div>
                <PostCategory/>
            </TwoColumnLayout>
            <Pagenation prevText="前の記事へ" prevUrl="/blog/0001" nextText="次の記事へ" nextUrl="/blog/0003"/>
        </Layout>
    );
}
 
export default DetailPage;