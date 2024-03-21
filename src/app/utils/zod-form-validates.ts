import zod from 'zod';
//import { RegisterData, LoginData } from '../../types/forms';


export const registerSchema = zod.object({
  email: zod.string().email('El correo electrónico no es válido.'),
  first_name: zod.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres.'),
  last_name: zod.string().min(3, 'El apellido de usuario debe tener al menos 3 caracteres.'),
  phone: zod.string().min(10, 'El número de teléfono debe tener 10 caracteres.'),
  password: zod.string().min(6, 'La contraseña debe tener al menos 6 caracteres.'),
});

export const loginSchema = zod.object({
  email: zod.string().email('El correo electrónico no es válido.'),
  password: zod.string().min(6, 'La contraseña debe tener al menos 6 caracteres.'),
});


export async function validateRegister(formData: FormData): Promise<ValidateRegisterState> {
  const validateData = registerSchema.safeParse({
    email: formData.get('email'),
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    phone: formData.get('phone'),
    password: formData.get('password'),
  })

  if (!validateData.success) return {
    errors: validateData.error.flatten().fieldErrors
  }
  try {
    const response = await fetch('https://e-commerce-api-v2.academlo.tech/api/v1/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: validateData.data.email,
        firstName: validateData.data.first_name,
        lastName: validateData.data.last_name,
        phone: validateData.data.phone,
        password: validateData.data.password,
      }),
      redirect: 'follow'
    });
    if (!response.ok) {
      return {
        errors: {
          email: ['El correo electrónico ya está en uso.'],
        }
      }
    }
    return {
      success: 'Usuario registrado con éxito, ya puedes iniciar sesión.'
    }
  } catch (error) {
    return {
      errors: {
        email: ['El correo electrónico ya está en uso.'],
      }
    };
  }
}


export async function loginValidate(data: FormData): Promise<ValidateLoginState>{
  const validateData = loginSchema.safeParse({
    email: data.get('email'),
    password: data.get('password'),
  });
  if (!validateData.success) return {
    errors: validateData.error.flatten().fieldErrors
  }
  try {
    const response = await fetch('https://e-commerce-api-v2.academlo.tech/api/v1/users/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: validateData.data.email,
        password: validateData.data.password,
      }),
      redirect: 'follow'
    });
    if (!response.ok) {
      return {
        errors: {
          email: ['El correo electrónico o la contraseña son incorrectos.'],
        }
      }
    }
    const { token } = await response.json();
    localStorage.setItem('token', token);
    console.log(response)
    return {
      success: 'Inicio de sesión exitoso.'
    }
  
  } catch (error) {
    return {
      errors: {
        email: ['El correo electrónico o la contraseña son incorrectos.'],
      }
    }
  }
}


export interface ValidateRegisterState {
  errors?: {
    email?: string[];
    first_name?: string[];
    last_name?: string[];
    phone?: string[];
    password?: string[];
  };
  success?: string;
}

export interface ValidateLoginState {
  errors?: {
    email?: string[];
    password?: string[];
  };
  success?: string;
}