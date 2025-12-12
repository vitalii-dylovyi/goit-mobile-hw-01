/**
 * API модуль для роботи з даними про тварин
 * Використовує Fetch API для відправки HTTP-запитів
 */

// Константа з URL API
const API_URL = 'https://68b5f788e5dc090291b09b08.mockapi.io/pets';

/**
 * Типи даних для тварини з API
 */
export interface Pet {
  id: string;
  name: string;
  type: string;
  img: string;
  breed: string;
  birthdate: string;
  gender: string;
  weight: number;
  createdAt: string;
}

/**
 * Отримує список всіх тварин з API
 * @returns Promise з масивом тварин
 * @throws Error якщо запит не вдався
 */
export async function fetchPets(): Promise<Pet[]> {
  try {
    const response = await fetch(API_URL);

    // Перевіряємо чи відповідь успішна
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Парсимо JSON відповідь
    const data: Pet[] = await response.json();
    return data;
  } catch (error) {
    // Обробка помилок мережі або парсингу
    if (error instanceof Error) {
      throw new Error(`Failed to fetch pets: ${error.message}`);
    }
    throw new Error('Failed to fetch pets: Unknown error');
  }
}

/**
 * Отримує дані про конкретну тварину за ID
 * @param id - Ідентифікатор тварини
 * @returns Promise з даними тварини
 * @throws Error якщо запит не вдався або тварина не знайдена
 */
export async function fetchPetById(id: string): Promise<Pet> {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Pet with id ${id} not found`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Pet = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch pet: ${error.message}`);
    }
    throw new Error('Failed to fetch pet: Unknown error');
  }
}

