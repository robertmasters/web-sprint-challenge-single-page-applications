import * as yup from 'yup'

const formSchema = yup.object().shape({
    orderName: yup
    .string()
    .min(3, "Must be at least 2 characters long.")
    .required("Must include name."),
    instructions: yup
    .string()
    .min(0, "Must be at least 0 characters long.")
    .required("Must include instructions."),
    size: yup
    .string()
    .required("must select a size")
})

export default formSchema