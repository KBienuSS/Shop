import { NestFactory } from '@nestjs/core';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from './app.module';
import { Product } from './products/product.entity';

const products = [
  {
    title: 'Rower Górski',
    description: 'Solidny rower górski do jazdy w trudnym terenie, aluminiowa rama, 21 biegów.',
    minPrice: 800,
    image: 'https://placehold.co/600x400?text=Rower+Gorski',
    additionalImages: [
      'https://placehold.co/300x200?text=Rower+1',
      'https://placehold.co/300x200?text=Rower+2',
    ],
  },
  {
    title: 'Telewizor Full HD',
    description: 'Telewizor 43" o rozdzielczości Full HD, smart TV, wbudowany Wi-Fi.',
    minPrice: 3200,
    image: 'https://placehold.co/600x400?text=Telewizor',
    additionalImages: [
      'https://placehold.co/300x200?text=TV+1',
    ],
  },
  {
    title: 'Iphone 17',
    description: 'Najnowszy model smartfona z serii Iphone, 256GB, potrójny aparat.',
    minPrice: 5600,
    image: 'https://placehold.co/600x400?text=Iphone+17',
    additionalImages: [
      'https://placehold.co/300x200?text=Iphone+1',
      'https://placehold.co/300x200?text=Iphone+2',
    ],
  },
  {
    title: 'Laptop Gamingowy',
    description: 'Wydajny laptop do gier, karta graficzna dedykowana, 16GB RAM.',
    minPrice: 4800,
    image: 'https://placehold.co/600x400?text=Laptop',
    additionalImages: [
      'https://placehold.co/300x200?text=Laptop+1',
      'https://placehold.co/300x200?text=Laptop+2',
    ],
  },
  {
    title: 'Słuchawki Bezprzewodowe',
    description: 'Słuchawki nauszne z aktywną redukcją szumów, do 30h pracy na baterii.',
    minPrice: 650,
    image: 'https://placehold.co/600x400?text=Sluchawki',
    additionalImages: [
      'https://placehold.co/300x200?text=Sluchawki+1',
    ],
  },
  {
    title: 'Konsola do Gier',
    description: 'Konsola nowej generacji, 1TB pamięci, obsługa 4K.',
    minPrice: 2400,
    image: 'https://placehold.co/600x400?text=Konsola',
    additionalImages: [
      'https://placehold.co/300x200?text=Konsola+1',
      'https://placehold.co/300x200?text=Konsola+2',
    ],
  },
  {
    title: 'Smartwatch Sportowy',
    description: 'Zegarek sportowy z GPS, pomiarem tętna i wodoodpornością do 50m.',
    minPrice: 900,
    image: 'https://placehold.co/600x400?text=Smartwatch',
    additionalImages: [
      'https://placehold.co/300x200?text=Smartwatch+1',
    ],
  },
  {
    title: 'Aparat Fotograficzny',
    description: 'Aparat bezlusterkowy z obiektywem 18-55mm, nagrywanie w 4K.',
    minPrice: 3900,
    image: 'https://placehold.co/600x400?text=Aparat',
    additionalImages: [
      'https://placehold.co/300x200?text=Aparat+1',
      'https://placehold.co/300x200?text=Aparat+2',
    ],
  },
  {
    title: 'Ekspres do Kawy',
    description: 'Automatyczny ekspres ciśnieniowy z wbudowanym młynkiem do kawy.',
    minPrice: 1500,
    image: 'https://placehold.co/600x400?text=Ekspres',
    additionalImages: [
      'https://placehold.co/300x200?text=Ekspres+1',
    ],
  },
];

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const productRepository = app.get(getRepositoryToken(Product));

  await productRepository.clear();
  await productRepository.save(products);

  console.log(`Dodano ${products.length} produktów do bazy.`);

  await app.close();
}

seed().catch((error) => {
  console.error('Błąd podczas seedowania:', error);
  process.exit(1);
});