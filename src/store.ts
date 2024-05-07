import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

type AuthData = {
  token: string;
  username: string;
  id: string;
};

type AppState = {
  authData: AuthData;
  setAuthData: (params: Partial<AuthData>) => void;
  logout: () => void;
};

const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        authData: {
          token: "",
          username: "",
          id: "",
        },
        setAuthData: (params) => {
          console.log("Setting auth data");
          set((state) => ({
            authData: {
              ...state.authData,
              ...params,
            },
          }));
        },
        logout: () => {
          console.log("Logout out");
          set({
            authData: {
              token: "",
              username: "",
              id: "",
            },
          });
        },
      }),
      {
        name: "cache-storage",
      }
    )
  )
);

export default useAppStore;