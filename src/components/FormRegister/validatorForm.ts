import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import validator from 'validator'

interface ValidatorFormProps {
  (
    counter: number,
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    student: boolean,
    college: string,
    course: string,
    cellphone: string,
    registration: string,
    period: string,
  ): boolean
}

export const ValidatorForm: ValidatorFormProps = (
  counter,
  name,
  email,
  password,
  confirmPassword,
  student,
  college,
  course,
  cellphone,
  registration,
  period,
) => {
  if (counter === 1) {
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      toast.warn('Preencha todos os campos', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
      return false
    }

    if (name.length < 5) {
      toast.warn('Nome deve ter no mínimo 5 caracteres', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
      return false
    }

    if (!validator.isEmail(email)) {
      toast.warn('Email inválido', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
      return false
    }

    if (password !== confirmPassword) {
      toast.warn('As senhas não são iguais', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
      return false
    }

    if (password.length < 8) {
      toast.warn('A senha deve ter no mínimo 8 caracteres', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
      return false
    }

    if (password.length > 20) {
      toast.warn('A senha deve ter no máximo 20 caracteres', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
      return false
    }

    if (validator.isLowercase(password)) {
      toast.warn('A senha deve ter pelo menos uma letra maiúscula', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
      return false
    }

    if (validator.isUppercase(password)) {
      toast.warn('A senha deve ter pelo menos uma letra minúscula', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
      return false
    }

    return true
  }

  if (counter === 3) {
    if (student) {
      if (cellphone === '' || registration === '' || period === '') {
        toast.warn('Preencha todos os campos', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        return false
      }

      if (cellphone.length < 11) {
        toast.warn('Celular inválido', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        return false
      }

      if (registration.length <= 5) {
        toast.warn('Matrícula inválida', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        return false
      }

      if (period.length < 1) {
        toast.warn('Período inválido', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        return false
      }

      return true
    }

    if (!student) {
      if (
        cellphone === '' ||
        college === '' ||
        course === '' ||
        period === ''
      ) {
        toast.warn('Preencha todos os campos', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        return false
      }

      if (cellphone.length < 11) {
        toast.warn('Celular inválido', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        return false
      }

      if (college.length < 2) {
        toast.warn('Nome da Faculdade inválido', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        return false
      }

      if (course.length < 2) {
        toast.warn('Nome do Curso inválido', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        return false
      }

      if (period.length < 1) {
        toast.warn('Período inválido', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        return false
      }

      return true
    }

    return true
  }

  return true
}
