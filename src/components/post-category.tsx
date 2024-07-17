import { FC, useEffect, useState } from "react";
import { FolderOpen } from "lucide-react";
import { Category } from "@/types/blog";
import Link from "next/link";
import { selectCategories } from "@/utils/supbase";

const PostCategory: FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
          const data = await selectCategories();
          setCategories(data);
        };
        fetchCategories();
    }, []);

    return (
        <div className="flex flex-row lg:flex-col py-4 gap-4 w-full lg:w-60 justify-start items-center lg:justify-center lg:items-end">
        {/* //     <FolderOpen size={16}/>
        //     <div>カテゴリ1</div>
        //     <div>カテゴリ2</div>
        // </div> */}
        {/* // <div className="flex flex-row lg:flex-col py-4 gap-4 w-full md:w-60 justify-start items-center lg:justify-center lg:items-end md:items-end"> */}
        <FolderOpen size={16} />
        {categories.map(({ id, name }) => (
          <Link href={`/blogs/category/${id}`} key={id}>
            <div>{name}</div>
          </Link>
        ))}
      </div>
    );
};
 
export default PostCategory;