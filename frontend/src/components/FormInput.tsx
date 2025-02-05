import { Form } from "react-bootstrap";
import {ChangeEvent} from "react";

interface FormInputProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    required?: boolean;
}

export const FormInput = ({ label, type, name, value, onChange, placeholder, required = true }: FormInputProps) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
        </Form.Group>
    );
};
