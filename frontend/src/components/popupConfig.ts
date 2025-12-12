import Signin2 from "@/assets/signin2.svg";
import Signin5 from "@/assets/Signin5.svg";
import Signin6 from "@/assets/Signin6.svg";
import LostKey from "@/assets/lost_key.svg";

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

export const signinPopupConfigs: PopupConfig[] = [
  // First popup - Basic details
  {
    leftPanel: {
      title: "UNLOCK YOUR\nPOTENTIAL WITH\nYUVAX ⭐",
      image: Signin2,
      imageAlt: "Girl with laptop sitting on books"
    },
    rightPanel: {
      title: "Welcome to YuvaX!",
      subtitle: "Step Into Smart Learning 💡",
      stepInfo: "1/3"
    }
  },
  // Second popup - Personal details
  {
    leftPanel: {
      title: "WE'RE ALMOST\nREADY TO LAUNCH\nJUST NEED\nYOUR DETAILS 🚀",
      image: Signin5,
      imageAlt: "Astronaut character"
    },
    rightPanel: {
      title: "Personal Details",
      subtitle: "Just the basics so we know who's about to shine 🌟",
      stepInfo: "2/3"
    }
  },
  // Third popup - Password confirmation
  {
    leftPanel: {
      title: "ONE LAST STEP TO\nCLAIM YOUR SEAT\nAT YUVAX 🤝",
      image: Signin6,
      imageAlt: "Astronaut with books"
    },
    rightPanel: {
      title: "Password confirmation",
      subtitle: "One more time, for good vibes ✨",
      stepInfo: "3/3"
    }
  },
  // Fourth popup - Login
  {
    leftPanel: {
      title: "UNLOCK YOUR\nPOTENTIAL WITH\nYUVAX ⭐",
      image: Signin2,
      imageAlt: "Girl with laptop sitting on books"
    },
    rightPanel: {
      title: "Welcome back to YuvaX!",
      subtitle: "Hey Explorer, back for more? 🚀",
      stepInfo: undefined
    }
  },
  // Fifth popup - Forgot Password
  {
    leftPanel: {
      title: "LOST YOUR KEY ?\nLET'S MAKE A\nNEW ONE 🔑",
      image: LostKey,
      imageAlt: "Character with question marks"
    },
    rightPanel: {
      title: "Forgot your Password?",
      subtitle: "Pop in your email & we'll send you a reset link 💌",
      stepInfo: undefined
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
  // First popup fields
  [
    {
      id: 'fullName',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Full Name',
      required: true,
      gridCols: 1,
      validation: (value: string) => !value.trim() ? 'Full name is required' : undefined
    },
    {
      id: 'parentsName',
      label: 'Parents Name',
      type: 'text',
      placeholder: 'Parents Name',
      required: true,
      gridCols: 1,
      validation: (value: string) => !value.trim() ? 'Parents name is required' : undefined
    },
    {
      id: 'phoneNumber',
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'Phone Number',
      required: true,
      gridCols: 2,
      validation: (value: string) => {
        if (!value) return 'Phone number is required';
        if (!/^[0-9]+$/.test(value)) return 'Phone number must be numbers only';
        return undefined;
      }
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Email',
      required: true,
      gridCols: 2,
      validation: (value: string) => {
        if (!value) return 'Email is required';
        if (!value.includes('@gmail.com')) return 'Email must include @gmail.com';
        if (!/^[a-z0-9]+@gmail\.com$/.test(value)) return 'Email must contain only lowercase letters and numbers before @gmail.com';
        return undefined;
      }
    }
  ],
  // Second popup fields
  [
    {
      id: 'zone',
      label: 'Zone',
      type: 'select',
      placeholder: 'Zone',
      required: true,
      gridCols: 1,
      options: ['North Zone', 'South Zone', 'East Zone', 'West Zone', 'Central Zone'],
      validation: (value: string) => !value ? 'Zone is required' : undefined
    },
    {
      id: 'country',
      label: 'Country',
      type: 'select',
      placeholder: 'Country',
      required: true,
      gridCols: 1,
      options: ['India', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Japan'],
      validation: (value: string) => !value ? 'Country is required' : undefined
    },
    {
      id: 'dateOfBirth',
      label: 'Date of Birth',
      type: 'date',
      placeholder: 'dd/mm/yy',
      required: true,
      gridCols: 2,
      validation: (value: string) => !value ? 'Date of birth is required' : undefined
    },
    {
      id: 'gender',
      label: 'Gender',
      type: 'select',
      placeholder: 'Gender',
      required: true,
      gridCols: 2,
      options: ['Male', 'Female'],
      validation: (value: string) => !value ? 'Gender is required' : undefined
    }
  ],
  // Third popup fields - Password confirmation
  [
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Password',
      required: true,
      gridCols: 2,
      validation: (value: string) => {
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        return undefined;
      }
    },
    {
      id: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm Password',
      required: true,
      gridCols: 2,
      validation: (value: string) => {
        if (!value) return 'Confirm password is required';
        return undefined;
      }
    }
  ],
  // Fourth popup fields - Login
  [
    {
      id: 'loginEmail',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter Email',
      required: true,
      gridCols: 2,
      showEditIcon: true,
      validation: (value: string) => {
        if (!value) return 'Email is required';
        if (!value.includes('@gmail.com')) return 'Email must include @gmail.com';
        if (!/^[a-z0-9]+@gmail\.com$/.test(value)) return 'Email must contain only lowercase letters and numbers before @gmail.com';
        return undefined;
      }
    },
    {
      id: 'loginPassword',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter Password',
      required: true,
      gridCols: 2,
      showEditIcon: true,
      validation: (value: string) => {
        if (!value) return 'Password is required';
        return undefined;
      }
    }
  ],
  // Fifth popup fields - Forgot Password
  [
    {
      id: 'forgotEmail',
      label: 'Email',
      type: 'email',
      placeholder: 'Email',
      required: true,
      gridCols: 2,
      validation: (value: string) => {
        if (!value) return 'Email is required';
        if (!value.includes('@gmail.com')) return 'Email must include @gmail.com';
        if (!/^[a-z0-9]+@gmail\.com$/.test(value)) return 'Email must contain only lowercase letters and numbers before @gmail.com';
        return undefined;
      }
    }
  ]
];
