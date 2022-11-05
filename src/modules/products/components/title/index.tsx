import 'react'
import { FC } from 'react'

const Title:FC<any> = (props)=>{
    return(
    <h2 className="text-regular leading-none mb-4">
        <span className='bg-amber-100 p-5 py-3'>
            {props.children}
        </span>
    </h2>)
}

export default Title;