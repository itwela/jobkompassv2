export interface EducationProps {
    school: string;
    degree: string;
    date: string;
    details: string[];
}

export interface SkillsProps {
    technical: string[];
    additional: string[];
}

export interface JkInputProps {
    user: any
    label: string;
    placeholderText: string;
    type: string;
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    style?: React.CSSProperties;
}

export interface JkTextAreaProps {
    user: any
    label: string;
    placeholderText: string;
    value: string | any | undefined;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
    style?: React.CSSProperties;
}

export interface JkSelectProps {
    user: any;
    label: string; 
    value: string;
    triggerText: string;
    options: Array<{value: string, label: string}>;
    onChange: (value: string) => void;
}

export interface JkPopUpProps {
    user: any;
    className?: string;
    styledTrigger?: boolean;
    triggerClassName?: string;
    refComponent?: React.RefObject<HTMLDivElement> | any;
    label: string;
    header: string;
    subtitle: string;
    trigger: string | React.ReactNode;
    BigField?: React.ReactNode;
    onChangeBigField?: (index: number, field: string, value: string | string[] | any) => void;
    smallFields?: any[];
    onChangeSmallField?: (index: number, field: string, value: string | string[] | any) => void;
}

export interface JkEducationProps {
    user: any;
    education: EducationProps[];
    onChange?: (index: number, field: string, value: string | string[] | any) => void;
    onCreate?: () => void;
    onDelete?: (index: number) => void;
}

export interface JkSkillsFieldsProps {
    user: any;
    skills: SkillsProps[];
    onChange?: (index: number, field: string, value: string | string[] | any) => void;
    onDelete?: (index: number) => void;  
} 

export interface JkComboboxProps {
    user: any;
    label: string;
    initialObjectOfThings: any;
    notFoundComponent: React.ReactNode;
    onChange?: (index: number, field: string, value: string | string[] | any) => void;
    onDelete?: (index: number) => void;
}