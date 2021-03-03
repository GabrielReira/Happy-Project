// Arquivo para lidar com possíveis erros da aplicação
import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  // Erro de validação na inserção dos dados
  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    // Mostrar ao usuário quais campos deram erro
    error.inner.forEach(err => {
      errors[err.path] = err.errors;
    });

    return response.status(400).json({ message: 'Validation fails', errors })
  }

  // Erro interno: para mim o erro aparecerá no terminal
  console.error(error);
  // Para o usuário aparecerá uma mensagem de 'erro interno'
  return response.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
