import React from 'react'
import { useForm } from 'react-hook-form';


const ProductsForm = () => {

    const { register, handleSubmit } = useForm();

    const submit = (data) => {
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div>
                    <label htmlFor='title-input'>Title</label>
                    <input type='text' id='title-input' {...register("title")} />
                </div>
                <div>
                    <label htmlFor='description-input'>Description</label>
                    <input type='text' id='description-input' {...register("description")} />
                </div>
                <div>
                    <label htmlFor='isCompleted-input'>Is Completed</label>
                    <input type='checkbox' id='isCompleted-input' {...register("isCompleted")} />
                </div>

                <button>Enviar</button>
            </form>
        </div>
    )
}

export default ProductsForm
