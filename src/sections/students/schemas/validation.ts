import * as yup from 'yup';

export const studentValidationSchema  = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .matches(/^[A-Za-z\s]+$/, 'Name should only contain letters'),

  class: yup.string().required('Class is required'),

  section: yup.string().required('Section is required'),

  rollNumber: yup
    .string()
    .required('Roll number is required')
    .matches(/^[0-9]+$/, 'Roll number must be numeric'),

  dateOfBirth: yup.string().required('Date of birth is required'),

  gender: yup.string().required('Gender is required'),

  guardianName: yup
    .string()
    .required('Guardian name is required')
    .min(2, 'Guardian name must be at least 2 characters')
    .matches(/^[A-Za-z\s]+$/, 'Guardian name should only contain letters'),

  contactNumber: yup
    .string()
    .required('Contact number is required')
    .matches(/^[0-9]{10}$/, 'Contact number must be 10 digits'),

  email: yup.string().required('Email is required').email('Invalid email format'),

  address: yup
    .string()
    .required('Address is required')
    .min(10, 'Address must be at least 10 characters'),

  bloodGroup: yup.string().required('Blood group is required'),
});
