import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

interface UserState {
  userId: any | null;
  userName: any | null;
  isManager: any | null;
  teamId: any | null;
  teamName: any | null;
}

interface UserActions {
  setUserId(userId: string): void;
  setUserName(userName: string): void;
  setUserManager(isM: Boolean): void;
  setTeamId(teamId: string): void;
  setTeamName(teamName: string): void;
  logout(): void;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userId: useLocalStorage('userId', null),
    userName: useLocalStorage('userName', null),
    isManager: useLocalStorage('isManager', false),
    teamId: useLocalStorage('teamId', null),
    teamName: useLocalStorage('teamName', null),
  }),
  actions: {
    setUserId(this: UserState & UserActions, userId: string) {
      this.userId = userId;
    },
    setUserName(this: UserState & UserActions, userName: string) {
      this.userName = userName;
    },
    setUserManager(this: UserState & UserActions, isM: Boolean) {
      this.isManager = isM;
    },
    setTeamId(this: UserState & UserActions, teamId: string) {
      this.teamId = teamId;
    },
    setTeamName(this: UserState & UserActions, teamName: string) {
      this.teamName = teamName;
    },
    logout(this: UserState & UserActions) {
      this.userId = null;
      this.userName = null;
      this.isManager = false;
      this.teamId = null;
      this.teamName = null;
      console.log('User logged out');
    }
  },
}
);
