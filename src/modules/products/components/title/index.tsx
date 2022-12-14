import 'react'
import { FC } from 'react'

const Title:FC<any> = (props)=>{
    return(
    <h2 className="text-regular leading-none mb-4">
        <span className='text-sm text-white p-5 py-2 bg-black'>
            {props.children}
        </span>
    </h2>)
}

export default Title;