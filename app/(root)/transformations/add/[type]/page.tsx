import Header from '@/components/shared/Header'
import React from 'react'
import { transformationTypes } from '@/constants'
import TransformationForm from '@/components/shared/TransformationForm'
import { getUserById } from '@/lib/actions/user.actions'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const AddTransformationTypePage = async ({ params }: SearchParamProps) => {
    const { type } = params
    const transformation = transformationTypes[type];
    const { userId } = auth();

    if(!userId) redirect('/sign-in');

    const user = await getUserById(userId);

    return (
        <div>
            <Header title='Add Transformation Type' subtitle={transformation.subTitle} />
            <TransformationForm
            action='Add'
                type={transformation.type as TransformationTypeKey}
                userId={user?._id}
                creditBalance={user?.creditBalance}
            />
        </div>
    )
}

export default AddTransformationTypePage
