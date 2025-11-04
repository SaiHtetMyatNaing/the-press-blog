import CreatePostForm from '@/app/_components/postCreateForm'
import { getAllCategories } from '@/server/dal/categories';

const page = async () => {
  const categories = await getAllCategories();
  return (
    <CreatePostForm categories={categories}/>
  )
}

export default page