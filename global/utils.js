import AsyncStorage from "@react-native-async-storage/async-storage";

export const apiDispatch = (actionType = "", data = null) => {
  return {
    type: actionType,
    payload: data,
  };
};

export const getFromAsyncStorage = (key) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const value = await AsyncStorage.getItem(key);
      resolve(value);
    } catch (error) {
      console.log("error in retrieving from async storage");
      reject(error);
    }
  });
};

export const addToAsyncStorage = async (key, value) => {
  const existingObj = await getFromAsyncStorage(key);
  const stringifiedNewObj = JSON.stringify(value);

  console.log({ stringifiedNewObj, existingObj });

  if (existingObj !== stringifiedNewObj)
    AsyncStorage.setItem(key, stringifiedNewObj)
      .then(() => console.log("saved to async storage"))
      .catch((err) => console.log("error in saving to async storage" + err));
};
