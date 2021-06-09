import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect
} from "react";

export const OutlineContext = createContext({});

export function useSetOutlineOnHover(ref) {
  const { setOutlineItems } = useContext(OutlineContext);

  const onPointerOver = useCallback(() => {
    if (setOutlineItems) setOutlineItems((items) => [...items, ref.current]);
  }, []);
  const onPointerOut = useCallback(() => {
    if (setOutlineItems)
      setOutlineItems((items) => items.filter((item) => item !== ref.current));
  }, []);

  return { onPointerOver, onPointerOut };
}

/**
 * Wrap your scene in this provider to make it easier to assign outline items.
 */
export const OutlineItemsProvider = ({ children }) => {
  const [outlineItems, setOutlineItems] = useState();

  useEffect(() => {
    console.log(outlineItems);
  }, [outlineItems]);

  return (
    <OutlineContext.Provider value={{ outlineItems, setOutlineItems }}>
      {children}
    </OutlineContext.Provider>
  );
};
