'use client';
import { DynamicForm } from "@/components/DynamicForm/DynamicForm";
import { useState } from "react";
import formData from '@/services/formData.json';
import { IForm } from "@/types/types";

const defaultFormData: IForm[] = formData as IForm[];

export const FormInfo = () => {
    const [formValues, setFormValues] = useState<Record<string, string | number | boolean> | null>(null);
    const [customFormData, setCustomFormData] = useState<IForm[] | null>(null);


    const handleFormSubmit = (data: Record<string, string | number | boolean>) => {
        setFormValues(data);
    };
   
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const parsedData = JSON.parse(e.target?.result as string) as IForm[];
                    setCustomFormData(parsedData);
                    setFormValues(null);
                } catch (error) {
                    console.error("Invalid JSON format", error);
                }
            };
            reader.readAsText(file);
        }
    };

    const filteredFormValues = customFormData && formValues
        ? customFormData.reduce((acc, field) => {
            const key = field.default_value;
            if (typeof key === 'string' && formValues[key] !== undefined) {
                acc[key] = formValues[key];
            }
            return acc;
        }, {} as Record<string, string | number | boolean>)
        : formValues;
    return (
        <div className="flex flex-col sm:flex-row">
            <div className="flex flex-col">
                <div className="mb-4 w-full max-w-md">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Upload file to generate your own form
                    </label>
                    <div className="relative">
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <button
                            type="button"
                            className="w-full rounded-md border-2 border-dashed border-gray-500 shadow-sm bg-gray-100 py-2 text-gray-700 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            Choose JSON File
                        </button>
                    </div>
                    <p className="text-xs text-gray-500">format json</p>
                </div>

                {customFormData ? (
                    <DynamicForm jsonData={customFormData} onSubmit={handleFormSubmit} />
                ) : (
                    <DynamicForm jsonData={defaultFormData} onSubmit={handleFormSubmit} />
                )}

            </div>


            {filteredFormValues && (
                <div className="px-4 rounded-md mt-8 sm:mt-0 text-black max-w-72 sm:max-w-full">
                    <h2 className="text-xl font-semibold">Form Values</h2>
                    <pre className="mt-2 whitespace-pre-wrap break-words sm:whitespace-pre-line">
                        {JSON.stringify(filteredFormValues, null, 2)}
                    </pre>
                </div>
            )}

        </div>
    );
}