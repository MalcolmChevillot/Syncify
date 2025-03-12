export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  SyncList: undefined;
  Friends: undefined;
  FriendDetails: {
    friend: {
      id: string;
      displayName: string;
      points: number;
      profilePic: string;
    };
  };
};
