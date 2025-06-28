export interface BaseFormField {
    name: string;
    label: string;
    type: string;
    value?: any;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    displayLabel?: boolean;
    totalSpan?: number;
    actualSpan?: number;
}

export interface TextFormField extends BaseFormField {
    type: 'text';
}

export interface EmailFormField extends BaseFormField {
    type: 'email';
}

export interface NumberFormField extends BaseFormField {
    type: 'number';
    min?: number;
    max?: number;
    step?: number;
}

export interface DateFormField extends BaseFormField {
    type: 'date';
    min?: string; // YYYY-MM-DD
    max?: string;
}

export interface CheckboxFormField extends BaseFormField {
    type: 'checkbox';
    checked?: boolean;
}

export interface TextareaFormField extends BaseFormField {
    type: 'textarea';
    rows?: number;
}

export interface SelectFormField extends BaseFormField {
    type: 'select';
    multiple?: boolean;
    options?: { value: any; label: string }[];
}

export interface TimeFormField extends BaseFormField {
    type: 'time';
    min?: string;
    max?: string;
}

export interface DateTimeFormField extends BaseFormField {
    type: 'datetime';
    min?: string; 
    max?: string;
}

export type FormField =
    | TextFormField
    | EmailFormField
    | NumberFormField
    | DateFormField
    | CheckboxFormField
    | TextareaFormField
    | SelectFormField
    | TimeFormField
    | DateTimeFormField;
