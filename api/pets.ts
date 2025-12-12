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

export interface CreatePetData {
  name: string;
  type: string;
  breed: string;
  weight: number;
  gender: string;
  birthdate: string;
  img?: string;
}

export async function createPet(petData: CreatePetData): Promise<Pet> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(petData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Pet = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create pet: ${error.message}`);
    }
    throw new Error('Failed to create pet: Unknown error');
  }
}

export interface UpdatePetData {
  name?: string;
  type?: string;
  breed?: string;
  weight?: number;
  gender?: string;
  birthdate?: string;
  img?: string;
}

export async function updatePet(id: string, petData: UpdatePetData): Promise<Pet> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(petData),
    });

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
      throw new Error(`Failed to update pet: ${error.message}`);
    }
    throw new Error('Failed to update pet: Unknown error');
  }
}

