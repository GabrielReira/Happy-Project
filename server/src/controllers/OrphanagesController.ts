import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Orphanage from '../models/Orphanage';

export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    // Listar orfanatos
    const orphanages = await orphanagesRepository.find();

    return response.json(orphanages);
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
  
    const orphanagesRepository = getRepository(Orphanage);

    // Pesquisar um orfanato específico
    const orphanage = await orphanagesRepository.findOneOrFail(id);

    return response.json(orphanage);
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = request.body;
  
    const orphanagesRepository = getRepository(Orphanage);

    // "Hack" para lidar com upload de múltiplos arquivos
    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return { path: image.filename }
    })
  
    // Criar orfanato
    const orphanage = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    });
  
    // Salvar dados no banco
    await orphanagesRepository.save(orphanage);
  
    return response.status(201).json(orphanage);
  }
};
