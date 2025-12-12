// components/admin/adminUserFormConfig.ts
import Signin2 from "@/assets/signin2.svg";
import Signin5 from "@/assets/Signin5.svg";
import Signin6 from "@/assets/Signin6.svg";

export interface PopupConfig {
  leftPanel: {
    title: string;
    image: string;
    imageAlt: string;
  };
  rightPanel: {
    title: string;
    subtitle: string;
    stepInfo?: string;
  };
}

export const createUserPopupConfigs: PopupConfig[] = [
  // First popup - Basic details
  {
    leftPanel: {
      title: "CREATE NEW\nUSER ACCOUNT\nFOR YUVAX ⭐",
      image: Signin2,
      imageAlt: "Admin creating user"
    },
    rightPanel: {
      title: "User Basic Details",
      subtitle: "Let's start with the essentials 💡",
      stepInfo: "1/3"
    }
  },
  // Second popup - Personal details
  {
    leftPanel: {
      title: "ALMOST THERE!\nJUST A FEW MORE\nDETAILS 🚀",
      image: Signin5,
      imageAlt: "Astronaut character"
    },
    rightPanel: {
      title: "Personal Information",
      subtitle: "Complete the user profile 🌟",
      stepInfo: "2/3"
    }
  },
  // Third popup - Review and create
  {
    leftPanel: {
      title: "READY TO CREATE\nTHE USER ACCOUNT\n🤝",
      image: Signin6,
      imageAlt: "Success illustration"
    },
    rightPanel: {
      title: "Review & Create",
      subtitle: "Auto-generated password will be created ✨",
      stepInfo: "3/3"
    }
  }
];

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'date' | 'password';
  showEditIcon?: boolean;
  placeholder: string;
  required: boolean;
  options?: string[];
  validation?: (value: string) => string | undefined;
  gridCols?: 1 | 2;
}

export const formFieldConfigs: FormField[][] = [
  // First popup fields - Basic Details
  [
    {
      id: 'fullName',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter full name',
      required: true,
      gridCols: 2,
      validation: (value: string) => !value.trim() ? 'Full name is required' : undefined
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter email address',
      required: true,
      gridCols: 2,
      validation: (value: string) => {
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        return undefined;
      }
    },
    {
      id: 'phoneNumber',
      label: 'Phone Number',
      type: 'tel',
      placeholder: '+1234567890',
      required: true,
      gridCols: 2,
      validation: (value: string) => {
        if (!value) return 'Phone number is required';
        if (!/^\+?[0-9]{10,15}$/.test(value)) return 'Invalid phone number format';
        return undefined;
      }
    },
    // {
    //   id: 'parentsName',
    //   label: 'Parents Name (For Students)',
    //   type: 'text',
    //   placeholder: 'Enter parent name (optional for non-students)',
    //   required: false,
    //   gridCols: 2,
    // }
  ],
  // Second popup fields - Personal Details
  [
    {
      id: 'dateOfBirth',
      label: 'Date of Birth',
      type: 'date',
      placeholder: 'Select date',
      required: true,
      gridCols: 1,
      validation: (value: string) => !value ? 'Date of birth is required' : undefined
    },
    {
      id: 'gender',
      label: 'Gender',
      type: 'select',
      placeholder: 'Select gender',
      required: true,
      gridCols: 1,
      options: ['male', 'female'],
      validation: (value: string) => !value ? 'Gender is required' : undefined
    },
    {
      id: 'country',
      label: 'Country',
      type: 'select',
      placeholder: 'Select country',
      required: true,
      gridCols: 1,
      options: ['India', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Japan'],
      validation: (value: string) => !value ? 'Country is required' : undefined
    },
    {
      id: 'zone',
      label: 'Time Zone',
      type: 'select',
      placeholder: 'Select zone',
      required: true,
      gridCols: 1,
      options: ['EST', 'PST', 'CST', 'MST', 'IST', 'GMT', 'CET', 'JST'],
      validation: (value: string) => !value ? 'Zone is required' : undefined
    }
  ],
  // Third popup fields - Review (no input fields, just display)
  []
];