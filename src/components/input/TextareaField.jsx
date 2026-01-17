import React from "react";

const TextareaField = ({
    placeholder,
    label,
    className,
    textareaClassName = "",
    register,
    name,
    defaultValue,
    value,
    onChange,
    disabled = false,
    error,
    required,
    rows = 3,
}) => {
    // Determine if we're using controlled or uncontrolled mode
    const isControlled = value !== undefined && onChange !== undefined;
    const isUncontrolled = register && name;

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && (
                <label className="text-white/80 font-[500px] text-[14px] ml-1">
                    {label} {required && <span className="text-[#EFFC76]">*</span>}
                </label>
            )}
            <textarea
                {...(isUncontrolled ? register(name) : {})}
                {...(isControlled ? { value, onChange } : {})}
                {...(!isControlled && !isUncontrolled && defaultValue !== undefined ? { defaultValue } : {})}
                disabled={disabled}
                rows={rows}
                placeholder={placeholder}
                className={`bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76] py-2.5 px-4 rounded-[6px] w-full outline-none resize-vertical min-h-[80px] ${disabled && "bg-gray-400"
                    } ${error ? "border-red-500" : ""} ${textareaClassName}`}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default TextareaField;
