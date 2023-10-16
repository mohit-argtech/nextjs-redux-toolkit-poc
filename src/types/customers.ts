import * as yup from 'yup';

export const customerSchema = yup.object({
    nameId: yup
        .string()
        .matches(
            /^[a-z0-9_-]*$/,
            'Name id must be lower case and may only contain numbers, dash and lowdash',
        )
        .required('Please enter a name id'),
    name: yup.string().required('Please enter a name'),
    address: yup.string().required('Please enter an address'),
});

export type Customer = yup.InferType<typeof customerSchema> & { id: number };

export type NewCustomer = Omit<Customer, 'id'>;

export type CustomerDto = Omit<Customer, 'nameId'> & { name_id: string };

export type CollectionDto<T> = { items: T[]; total: number };

export type CustomerCollection = CollectionDto<CustomerDto>;