export interface IUsersStore {
  id: string;
  ownerId: string;
  users: [
    {
      email: string;
      id: string;
      name: string;
    },
  ];
}
