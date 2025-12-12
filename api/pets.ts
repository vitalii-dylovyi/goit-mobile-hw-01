const API_URL = 'https://68b5f788e5dc090291b09b08.mockapi.io/pets';

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

export async function fetchPets(): Promise<Pet[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Pet[] = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch pets: ${error.message}`);
    }
    throw new Error('Failed to fetch pets: Unknown error');
  }
}

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

