// Configurações de como os uploads serão feitos dentro da aplicação
// As imagens serão salvas na pasta 'uploads'

import multer from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),

    filename: (request, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  })
};
