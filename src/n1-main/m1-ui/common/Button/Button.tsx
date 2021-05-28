import React from 'react';
import './Button.css';

export interface ButtonProps {
    /**
     * Is this the principal call to action on the page?
     */
    primary?: boolean;
    /**
     * What background color to use
     */
    backgroundColor?: string;
    /**
     * How large should the button be?
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Button contents
     */
    label: string;
    /**
     * Optional click handler
     */
    onClick?: () => void;

    onBlur?: () => void

    disabled?: boolean

    id?: string
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
                                                  id,
                                                  onBlur,
                                                  disabled,
                                                  onClick,
                                                  primary = false,
                                                  size = 'medium',
                                                  backgroundColor,
                                                  label,
                                                  ...props
                                              }) => {
    const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';


    return (
        <button
            id={id}
            disabled={disabled}
            onBlur={onBlur}
            type="button"
            onClick={onClick}
            className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
            style={{backgroundColor}}
            {...props}
        >
            {label}
        </button>
    );
};