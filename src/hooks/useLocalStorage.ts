
const useLocalStorage = () => {
  const GET = (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  };

  const SET = <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  return {
    get: GET,
    set: SET,
  };
};

export default useLocalStorage;
