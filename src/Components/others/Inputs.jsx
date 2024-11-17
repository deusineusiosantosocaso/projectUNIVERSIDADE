import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import { InputMask } from 'primereact/inputmask';
import { classNames } from 'primereact/utils';

const CustomInput = ({
  type = 'text',
  options = [],
  label,
  value,
  onChange,
  required = false,
  placeholder,
  className = '',
  icon = 'pi pi-pencil',
  disabled = false
}) => {
  const [focused, setFocused] = useState(false);

  const containerClass = classNames(
    'bg-white rounded-lg transition-all duration-300',
    'border-2 relative',
    {
      'border-blue-500': focused,
      'border-gray-300': !focused,
      'opacity-75': disabled,
      'hover:border-blue-400': !disabled && !focused
    },
    className
  );

  const labelClass = classNames(
    'block text-sm font-semibold mb-2 transition-colors duration-300',
    {
      'text-blue-600': focused,
      'text-gray-700': !focused
    }
  );

  const iconClass = classNames(
    'absolute left-3 top-1/2 transform -translate-y-1/2 z-10',
    {
      'text-blue-500': focused,
      'text-gray-400': !focused
    }
  );

  const inputWrapperClass = classNames(
    'relative w-full',
    {
      'opacity-50 cursor-not-allowed': disabled
    }
  );

  const baseInputStyle = {
    paddingLeft: '2.5rem',
    height: '40px',
    width: '100%',
    transition: 'all 0.3s ease'
  };

  const renderInput = () => {
    const baseInputProps = {
      style: baseInputStyle,
      className: 'w-full rounded-lg',
      disabled,
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false)
    };

    switch (type) {
      case 'password':
        return (
          <Password
            {...baseInputProps}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            toggleMask
            feedback={false}
            inputClassName="h-[40px] pl-10"
          />
        );

      case 'select':
        return (
          <Dropdown
            {...baseInputProps}
            value={value}
            options={options}
            onChange={(e) => onChange(e.value)}
            placeholder={placeholder || 'Selecione uma opção'}
            panelClassName="border border-gray-300"
          />
        );

      case 'multiselect':
        return (
          <MultiSelect
            {...baseInputProps}
            value={value}
            options={options}
            onChange={(e) => onChange(e.value)}
            placeholder={placeholder || 'Selecione múltiplas opções'}
            display="chip"
          />
        );

      case 'date':
        return (
          <Calendar
            {...baseInputProps}
            value={value}
            onChange={(e) => onChange(e.value)}
            showIcon={false}
            dateFormat="dd/mm/yy"
            inputClassName="h-[40px] pl-10"
          />
        );

      case 'phone':
        return (
          <InputMask
            {...baseInputProps}
            value={value}
            onChange={(e) => onChange(e.value)}
            mask="999-999-999"
            placeholder={placeholder || '___-___-____'}
          />
        );

      case 'radio':
        return (
          <div className="flex gap-4">
            {options.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={`${label}-${option.value}`}
                  name={label}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(option.value)}
                  className="mr-2"
                />
                <label htmlFor={`${label}-${option.value}`}>{option.label}</label>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <InputText
            {...baseInputProps}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type={type}
            placeholder={placeholder || `Digite ${label?.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label className={labelClass}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className={containerClass}>
        <i className={`${icon} ${iconClass}`}></i>
        <div className={inputWrapperClass}>
          {renderInput()}
        </div>
      </div>
    </div>
  );
};

export default CustomInput;