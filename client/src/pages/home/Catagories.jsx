import { Link } from 'react-router-dom';
import {React} from 'react'

const categoryItems = [
    {id: 1, title: "Main Dish", image: "/images/home/category/img1.png"},
    {id: 2, title: "Tiffin", image: "/images/home/category/img2.png"},
    {id: 3, title: "Pizza", image: "/images/home/category/img3.png"},
    {id: 4, title: "Drinks", image: "/images/home/category/img4.png",}
]

const Catagories = () => {
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-16'>
        <div className='text-center'>
            <p className='subtitle'>Customer Favorites</p>
            <h2 className='title'><span className="text-blue">Popular</span> Catagories</h2>
        </div>

        {/* category cards */}
        <div className='flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12 '>
            {
                categoryItems.map((item, i) => (
                    <Link to='/menu'>
                    <div key={i} className='shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 transition-all duration-300 z-10'>
                        <div className='w-full mx-auto flex items-center justify-center'><img src={item.image} alt="" className='bg-[#6766d4] p-5 rounded-full w-28 h-28' /></div>
                        <div className='mt-5 space-y-1'>
                            <h5 className='text-[#1E1E1E] font-semibold'>{item.title}</h5>
                        </div>
                    </div>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default Catagories