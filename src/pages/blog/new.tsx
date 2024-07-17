import Layout from "@/components/layout";
import { Category } from "@/types/blog";
import { insertCategory, insertPost, selectCategories, uploadEyecatchImage } from "@/utils/supbase";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const Page = () => {
    const [categoryName, setCategoryName] = useState<string>("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [postTitle, setPostTitle] = useState<string>("");
    const [postBody, setPostBody] = useState<string>("");
    const [postEyecatchUrl, setPostEyecatchUrl] = useState<string>("");

    const onChangePostTitle = (e: ChangeEvent<HTMLInputElement>) =>{
        setPostTitle(e.target.value);
    }

    const onChangePostBody = (e: ChangeEvent<HTMLTextAreaElement>) =>{
        setPostBody(e.target.value);
    }

    const onChangeEyecatch = async (e: ChangeEvent<HTMLInputElement>) =>{
        if(!e.target.files){
            setPostEyecatchUrl("");
            return;
        }
        const file = e.target.files[0];
        const eyecatchUrl = await uploadEyecatchImage(file);
        if(typeof eyecatchUrl === "string"){
            setPostEyecatchUrl(eyecatchUrl);
        }else{
            alert("アップロードに失敗しました");
        }
    }

    const onSubmitInsertPost = async (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(postTitle.length === 0 || postBody.length === 0 || postEyecatchUrl.length === 0 || categoryId === 0){
            return;
        }
        const response = await insertPost(
            postTitle, postBody, categoryId, postEyecatchUrl
        );
        if( response === null){
            setPostTitle(""); 
            setPostBody("");
            setPostEyecatchUrl("");
            setCategoryId(categories.length === 0 ? 0 : categories[0].id);
        }else{
            alert("記事の投稿に失敗しました");
        }
    }

    const fetchCategories = async ()=>{
        const data = await selectCategories();
        setCategories([...data]);
        setCategoryId(data.length === 0 ? 0 : data[0].id);
    }

    const onChangeCategoryName = (e:ChangeEvent<HTMLInputElement>) =>{
        setCategoryName(e.target.value);
    }
    const onSubmitInsertCategory = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(categoryName.length === 0) return;
        await insertCategory(categoryName);
        setCategoryName("");
        await fetchCategories();
    }

    useEffect(()=>{
        fetchCategories();
    }, []);

    const onChangeCategoryId = (e: ChangeEvent<HTMLSelectElement>)=>{
        setCategoryId(Number(e.target.value));
    }

    return (
        <Layout>
            <div className="flex flex-col lg:flex-row gap-10 justify-center items-center lg:items-start my-10">
                <div className="flex flex-col p-5 bg-slate-200 rounded-lg w-80 text-xl ">
                    <h2 className="text-center">ブログの追加</h2>
                    <form className="flex flex-col gap-y-5" onSubmit={onSubmitInsertPost}>
                        <div className="flex flex-col">
                            <label htmlFor="post-title">Post Title</label>
                            <input type="text" id="post-title" value = {postTitle} onChange={onChangePostTitle}/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="post-body">Post Body</label>
                            <textarea id="post-body" value={postBody} onChange={onChangePostBody}></textarea>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="post-category">Post Category</label>
                            <select  id="post-category" onChange={onChangeCategoryId}>
                                {categories.map(({id, name})=>(
                                    <option value={id} key={id}>{name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="post-eyecatch">Post Eyecatch</label>
                            <input type="file" id="post-eyecatch" accept="image/*" onChange={onChangeEyecatch}/>
                        </div>
                        <div className="flex justify-center">
                            <input type="submit" value="記事を追加する" className="bg-indigo-700 text-white p-2 w-full rounded" />
                        </div>
                    </form>
                </div>
                <div className="flex flex-col p-5 bg-slate-200 rounded-lg w-80 text-xl ">
                    <h2 className="text-center">カテゴリーの追加</h2>
                    <form className="flex flex-col gap-y-5" onSubmit={onSubmitInsertCategory}>
                        <div className="flex flex-col">
                            <label htmlFor="post-new-category">Category</label>
                            <input type="text"  id="post-new-category" value={categoryName} onChange={onChangeCategoryName}/>
                        </div>
                        <div className="flex justify-center">
                            <input type="submit" value="カテゴリを追加する" className="bg-indigo-700 text-white p-2 w-full rounded" />
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
 
export default Page;