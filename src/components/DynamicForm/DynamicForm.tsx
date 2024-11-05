'use client';
import { IForm } from '@/types/types';
import { useForm, SubmitHandler  } from 'react-hook-form';

 interface IDynamicForm {
    jsonData: IForm[];
    onSubmit: ( data: Record<string, string | number | boolean>) => void;
}

export const DynamicForm: React.FC<IDynamicForm> = ({ jsonData, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Record<string, string | number | boolean>>({mode:"onChange"});

const renderField = (field: IForm, index: number) => {
    const fieldName = field.default_value?.toString() || `field_${index}`;
    const fieldProps = {
        defaultValue: '',
        ...register(fieldName, {
            required: 'This field is required',
              pattern: field.type === 'number'
                ? { value: /^[0-9]+$/, message: 'Only numbers' }
                : field.validation
                ? { value: new RegExp(field.validation), message: 'Invalid format' }
                : undefined,
            min: field.min_value,
            max: field.max_value
        })
    };

    return (
        <div key={index} className='text-black'>
            <label className="block text-sm font-medium text-gray-700">{field.default_value}</label>
            
            {field.type === 'text' && (
                <input
                    type="text"
                    className="mt-2 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    {...fieldProps}
                />
            )}

            {field.type === 'longtext' && (
                <textarea
                    className="mt-2 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    {...fieldProps}
                />
            )}

            {field.type === 'number' && (
                <input
                    type="text"
                    inputMode="numeric"
                    className="mt-2 block w-full rounded border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    {...fieldProps}
                   
                />
            )}

            {field.type === 'dropdown' && (
                <select
                    className="mt-2 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    {...fieldProps}
                >
                    {field.options?.map((option, idx) => (
                        <option key={idx} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            )}

            {errors[fieldName] && (
                <span className="text-red-500 text-xs">
                    {errors[fieldName]?.type === 'required' && 'This field is required'}
                    {errors[fieldName]?.type === 'pattern' && errors[fieldName]?.message}
                    {errors[fieldName]?.type === 'min' && `Value must be at least ${field.min_value}`}
                    {errors[fieldName]?.type === 'max' && `Value must be no more than ${field.max_value}`}
                </span>
            )}
        </div>
    );
};
    
     const onSubmitForm: SubmitHandler<Record<string, string | number |boolean>> = (data) => {
        onSubmit(data); 
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 w-72 sm:w-80 flex flex-col justify-center">
            {jsonData.map((field, index) => renderField(field, index))}
            <button
                type="submit"
                className="bg-sky-500/50 text-white rounded-md px-4 py-2 hover:bg-sky-500 "
            >
                Submit
            </button>
        </form>
    );
};