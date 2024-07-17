import { Inter } from "next/font/google";
import Logo from "../components/logo";
import Nav from "@/components/nav";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Posts from "@/components/posts";
import { Post } from "@/types/blog";
import Pagenation from "@/components/pagenation";
import Footer from "@/components/footer";
import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import { selectPosts } from "@/utils/supbase";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await selectPosts();
      setPosts(data);
    };
    fetchPosts();
  }, []);


  return(
   <Layout>
      <Hero title="CUBE" subtitle="アプトプットしていくサイト" isImage/>
      <Posts posts={posts}/>
      <Pagenation nextText="次の記事へ" nextUrl="/blog"/>
   </Layout>
  ) ;
}
