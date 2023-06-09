import { createContext, useState } from "react";

export const UserContext = createContext<any>({});

function UserProvider({ children }) {
    const [user, setUser] = useState(undefined);
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  }

  export default UserProvider;