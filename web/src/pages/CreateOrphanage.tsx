// Gerando mapa através do leaflet
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { FormEvent, useState, ChangeEvent } from 'react';
import { useHistory } from 'react-router';
import { FiPlus } from "react-icons/fi";

import Sidebar from '../components/Sidebar';
import api from '../services/api';
import mapIcon from '../utils/mapIcon';
import '../styles/pages/create-orphanage.css';


export default function CreateOrphanage() {
  const history = useHistory();

  // Estado para lidar com cada campo do formulário
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // Função para o usuário definir a localização do orfanato ao clicar no mapa
  function SetLocation() {
    useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;

        setPosition({
          latitude: lat,
          longitude: lng,
        });
      },
    });

    return (position.latitude !== 0
      ? <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]}/>
      : null)
  }

  // Função para lidar com as escolhas das imagens
  function handleSelectedImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files)
    setImages(selectedImages);

    const selectedPreviewImages = selectedImages.map(image => {
      return URL.createObjectURL(image);
    })
    setPreviewImages(selectedPreviewImages);
  }

  // Função para lidar com o envio do formulário
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const {latitude, longitude } = position;
    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    images.forEach(image => {
      data.append('images', image);
    })

    // Inserindo dados no banco de dados
    await api.post('/orphanages', data);
    alert('Cadastro realizado com sucesso!');
    history.push('/app');
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <div className="input-block">
              <label>Localização</label>
              <MapContainer
                center={[-12.9916227, -38.4857368]} 
                style={{ width: '100%', height: 280 }}
                zoom={13}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <SetLocation />
              </MapContainer>
            </div>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={event => setAbout(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name} />
                  )
                })}        
                <label htmlFor="images" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input multiple onChange={handleSelectedImages} type="file" id="images" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={event => setInstructions(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={event => setOpeningHours(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>
              <div className="button-select">
                <button onClick={() => setOpenOnWeekends(true)} type="button" className={open_on_weekends ? 'active-yes' : ''}>
                  Sim
                </button>
                <button onClick={() => setOpenOnWeekends(false)} type="button" className={open_on_weekends ? '' : 'active-no'}>
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
