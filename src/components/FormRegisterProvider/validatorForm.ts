import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import validator from 'validator'

interface ValidatorFormProps {
  (
    counter: number,
    name: string,
    email: string,
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
  student,
  college,
  course,
  cellphone,
  registration,
  period,
) => {
  if (counter === 1) {
    if (name === '' || email === '') {
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
