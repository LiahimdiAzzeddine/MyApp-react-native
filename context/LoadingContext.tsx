import React, { createContext, useContext, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

const LoadingContext = createContext({
  spinner : false,
  setSpinner : (val: boolean) => {},
});

export const useSpinner  = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }:any) => {
  const [spinner, setSpinner ] = useState(false);

  return (
    <LoadingContext.Provider value={{ spinner , setSpinner  }}>
      {children}
      {spinner  && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </LoadingContext.Provider>
  );
};
