import Header from '@/components/shared/Header'
import React from 'react'
import { transformationTypes } from '@/constants'

const AddTransformationTypePage = ({ params }: SearchParamProps) => {
    const { type } = params
    const transformation = transformationTypes[type];
    
    return (
        <div>
            <Header title='Add Transformation Type' subtitle={transformation.subTitle} />
        </div>
    )
}

export default AddTransformationTypePage
