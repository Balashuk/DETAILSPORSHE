import Image from "next/image";
import Container from "./components/Containers";
import HomeBaner from "./components/HomeBaner";
import { products } from "@/utils/products";
import { truncateText } from "@/utils/truncateText";
import ProductCart from "./components/products/ProductCart";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";

interface HomeProps{
  searchParams:IProductParams
}


export default async function Home({searchParams}:HomeProps) {
  const products=await getProducts(searchParams)

  if(products.length===0){
    return <NullData title="Товар не знайдено виберіть іншу катрегорію або натисть Всі"/>
  }

  //Filters
  function shuffleArray(array:any){
    for(let i=array.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [array[i],array[j]]=[array[j],array[i]]
    }
    return array
  }
  const shuffleProducts=shuffleArray(products)

  return (
  <div className="p-8">
    <Container>
      <div>
        <HomeBaner/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl-grid-cols-5 2xl:grid-cols-6 gap-8">
        {shuffleProducts.map((product:any)=>{return <ProductCart key={product.id} data={product}/> ;
        })}
      </div>
    </Container>
    </div>
  );
}
