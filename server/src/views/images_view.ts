// Determina como as imagens estarão visíveis para os usuários
import Image from '../models/Image';

export default {
  // Renderizar uma imagem
  render(image: Image) {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`
    };
  },

  // Renderizar várias imagens
  renderMany(images: Image[]) {
    return images.map(image => this.render(image))
  }
};
