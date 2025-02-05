export interface Person {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Item {
  id: string;
  label: string;
  value: Person;
}

export const availableList: Item[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    label: 'Ігор Кузнєцов',
    value: {
      firstName: 'Ігор',
      lastName: 'Кузнєцов',
      email: 'igor.kuznetsov@example.com',
      phone: '+380955678901',
    },
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    label: 'Ольга Васильєва',
    value: {
      firstName: 'Ольга',
      lastName: 'Васильєва',
      email: 'olga.vasileva@example.com',
      phone: '+380636789012',
    },
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    label: 'Микола Морозов',
    value: {
      firstName: 'Микола',
      lastName: 'Морозов',
      email: 'nikolay.morozov@example.com',
      phone: '+380687890123',
    },
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    label: 'Тетяна Павлова',
    value: {
      firstName: 'Тетяна',
      lastName: 'Павлова',
      email: 'tatyana.pavlova@example.com',
      phone: '+380668901234',
    },
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    label: 'Сергій Волков',
    value: {
      firstName: 'Сергій',
      lastName: 'Волков',
      email: 'sergey.volkov@example.com',
      phone: '+380999012345',
    },
  },
];

export const selectedList: Item[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    label: 'Дмитро Сидоров',
    value: {
      firstName: 'Дмитро',
      lastName: 'Сидоров',
      email: 'dmitry.sidorov@example.com',
      phone: '+380933456789',
    },
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    label: 'Катерина Смирнова',
    value: {
      firstName: 'Катерина',
      lastName: 'Смирнова',
      email: 'ekaterina.smirnova@example.com',
      phone: '+380974567890',
    },
  },
];
